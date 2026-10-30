#!/usr/bin/env python3
"""Calcula aulas por data e número sequencial, independente dos projetos."""

from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / ".git" / "aula-atual"
CLASS_DAYS = {0, 2, 4}  # segunda, quarta e sexta
DAY_CODES = ("SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM")


def weekdays_between(start: date, end: date) -> int:
    """Conta aulas em dias letivos estritamente após start e até end."""
    total = 0
    day = start + timedelta(days=1)
    while day <= end:
        total += day.weekday() in CLASS_DAYS
        day += timedelta(days=1)
    return total


def read_archive() -> tuple[date, int]:
    if not ARCHIVE.exists():
        raise ValueError("O marcador .git/aula-atual não existe; inicialize a data e o número da aula.")
    values = {}
    for line in ARCHIVE.read_text(encoding="utf-8").splitlines():
        line = line.split("#", 1)[0].strip()
        if not line:
            continue
        key, separator, value = line.partition("=")
        if not separator:
            raise ValueError(f"Linha inválida em .git/aula-atual: {line}")
        values[key.strip()] = value.strip()
    try:
        anchor = date.fromisoformat(values["class_date"])
        number = int(values["class_number"])
    except (KeyError, ValueError) as error:
        raise ValueError(".git/aula-atual deve definir class_date=AAAA-MM-DD e class_number=NNN.") from error
    if number < 1:
        raise ValueError("class_number deve ser positivo.")
    return anchor, number


def current_class(today: date) -> tuple[date, int, int]:
    anchor, number = read_archive()
    if today < anchor:
        raise ValueError(f"A data consultada ({today}) é anterior à referência ({anchor}).")
    return anchor, number, number + weekdays_between(anchor, today)


def class_date(anchor: date, anchor_number: int, number: int) -> date:
    """Obtém o dia letivo correspondente ao número calculado."""
    day = anchor
    current = anchor_number
    while current < number:
        day += timedelta(days=1)
        if day.weekday() in CLASS_DAYS:
            current += 1
    return day


def registered_classes() -> set[int]:
    result = subprocess.run(
        ["git", "log", "--all", "--format=%s"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    registered = set()
    for subject in result.stdout.splitlines():
        prefix, separator, _ = subject.partition(":")
        parts = prefix.split("-")
        if separator and len(parts) == 3 and len(parts[0]) == 3 and parts[0].isdigit():
            if parts[1] in DAY_CODES and len(parts[2]) == 8:
                try:
                    date.strptime(parts[2], "%d.%m.%y")
                except ValueError:
                    continue
                registered.add(int(parts[0]))
    return registered


def advance(today: date) -> int:
    """Atualiza a referência apenas se as aulas decorridas estiverem registradas."""
    _, anchor_number, number = current_class(today)
    if today.weekday() not in CLASS_DAYS:
        raise ValueError("A data de avanço precisa ser segunda, quarta ou sexta.")
    registered = registered_classes()
    for candidate in range(anchor_number + 1, number + 1):
        if candidate not in registered:
            raise ValueError(
                f"A aula {candidate:03d} ainda não tem commit no formato "
                f"'{candidate:03d}-DIA-DD.MM.AA: ...'. Registre-a antes de avançar."
            )
    ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
    ARCHIVE.write_text(
        "# Marcador local da aula vigente (UTC); não versionar.\n"
        f"class_date={today.isoformat()}\nclass_number={number:03d}\n",
        encoding="utf-8",
    )
    return number


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--date", help="Data ISO para cálculo/teste (padrão: hoje em UTC).")
    parser.add_argument("--advance", action="store_true", help="Avança o arquivo para a aula vigente.")
    parser.add_argument("--commit-prefix", action="store_true", help="Imprime o prefixo de commit da aula vigente.")
    args = parser.parse_args()
    try:
        today = date.fromisoformat(args.date) if args.date else datetime.now(timezone.utc).date()
        if args.advance:
            number = advance(today)
            print(f"Aula {number:03d} registrada para {today.isoformat()} em .git/aula-atual")
        elif args.commit_prefix:
            anchor, anchor_number, number = current_class(today)
            meeting = class_date(anchor, anchor_number, number)
            print(f"{number:03d}-{DAY_CODES[meeting.weekday()]}-{meeting:%d.%m.%y}:")
        else:
            anchor, anchor_number, number = current_class(today)
            scheduled = class_date(anchor, anchor_number, number)
            weekdays = ("segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo")
            if today.weekday() not in CLASS_DAYS:
                status = "sem aula (fora do calendário)"
            elif today == scheduled:
                status = "dia de aula"
            else:
                status = "falta provável (dia letivo sem presença registrada)"
            print(
                f"Aula vigente: {number:03d} | data prevista: {scheduled.isoformat()} "
                f"({weekdays[scheduled.weekday()]}) | hoje: {weekdays[today.weekday()]} "
                f"({today.isoformat()}, {status})"
            )
        return 0
    except (ValueError, subprocess.CalledProcessError) as error:
        print(f"Erro: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
