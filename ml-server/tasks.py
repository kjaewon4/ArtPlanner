# ml-server/tasks.py

from celery_app import celery_app
from nst_model import run_style_transfer
import os
import multiprocessing

multiprocessing.set_start_method("spawn", force=True)

@celery_app.task(name="tasks.style_transfer_task")
def style_transfer_task(content_path, style_path, output_dir, quality="fast"):
    # task_id로 고유 파일 생성
    task_id = style_transfer_task.request.id
    output_path = os.path.join(output_dir, f"{task_id}.png")

    # 품질 설정에 따라 파라미터 선택
    if quality == "high":
        epochs = 10
        steps = 100
        max_dim = 512
    else:
        epochs = 6
        steps = 70
        max_dim = 256

    run_style_transfer(
        content_path=content_path,
        style_path=style_path,
        output_path=output_path,
        epochs=epochs,
        steps_per_epoch=steps,
        max_dim=max_dim
    )

    return output_path

'''

역할	설명
Celery 태스크 정의	@celery_app.task(...) 데코레이터 사용
요청별 고유 task_id 부여	task_id = style_transfer_task.request.id
고화질 vs 빠른 변환 선택	quality 값에 따라 epochs, steps, max_dim 달리 설정
결과 저장	outputs/{task_id}.png 파일로 저장됨
응답 값	결과 이미지 파일 경로 리턴 (result_backend에 저장됨)
'''