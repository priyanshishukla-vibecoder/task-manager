"""add priority to tasks

Revision ID: 9bdd0416004f
Revises: af340fd0f723
Create Date: 2026-05-08 11:51:10.349546

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "9bdd0416004f"
down_revision: Union[str, Sequence[str], None] = "af340fd0f723"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


task_priority_enum = postgresql.ENUM(
    "low",
    "medium",
    "high",
    name="taskpriority",
)


def upgrade() -> None:
    """Upgrade schema."""
    task_priority_enum.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "tasks",
        sa.Column(
            "priority",
            task_priority_enum,
            nullable=False,
            server_default="medium",
        ),
    )

    op.alter_column("tasks", "priority", server_default=None)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("tasks", "priority")
    task_priority_enum.drop(op.get_bind(), checkfirst=True)
