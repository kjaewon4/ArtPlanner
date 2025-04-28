# ml-server/celery_app.py
from celery import Celery

celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"  # ✅ 반드시 있어야 AsyncResult가 동작함
)

celery_app.conf.task_routes = {
    "tasks.style_transfer_task": {"queue": "style"}
}

celery_app.conf.update(
    task_serializer='json',
    result_serializer='json',
    accept_content=['json'],
    task_track_started=True,
    result_expires=3600,
)


'''

항목	설명
Celery 인스턴스 생성	celery_app = Celery(...)
Redis 사용	큐와 결과 저장 둘 다 Redis
작업 큐 설정	"tasks.style_transfer_task" → "style" 큐
JSON 직렬화	Celery ↔ FastAPI 통신을 안전하게
'''