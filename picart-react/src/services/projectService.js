export const getProjects = async () => {
    // 실제 API 호출로 교체할 부분
    return [
        {
            id: 1,
            projectName: "명화 스타일 적용",
            explanation:
                "사진을 업로드 해, 원하는 명화 이미지를 적용하거나 합성해보세요.",
            thumbnail: "/images/imageTrainingThumbnail.png",
        },
        {id: 2, 
            projectName: "이미지를 스케치 변경",
            explanation: "사진을 업로드 하고 스케치 스타일로 바꿔보세요."
        },
        {
            id: 3,
            projectName: "배경 제거",
            explanation:
                "인물모드와 사물모드를 선택해, 사진의 배경을 제거할 수 있습니다.",
        },
    ];
};

export const createProject = async (projectName) => {
    // 실제 API 호출 시: POST /api/projects
    return {id: Math.floor(Math.random() * 1000), projectName};
};

export const getProjectClasses = async (projectId) => {
    // 실제 API 호출로 교체
    return [
        {id: 1, className: "class1", sampleCount: 0},
        {id: 2, className: "class2", sampleCount: 0},
    ];
};

export const addClass = async (projectId, className) => {
    // 실제 API 호출 시: POST /api/projects/{projectId}/classes
    return {id: Math.floor(Math.random() * 1000), className, sampleCount: 0};
};
