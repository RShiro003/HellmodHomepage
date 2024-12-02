const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isAnimating = false; // 애니메이션 상태를 저장하는 변수

// 빠른 스크롤 효과를 위한 함수
function quickScrollToSection(index) {
    if (isAnimating) return; // 애니메이션 중일 때는 실행하지 않음
    if (index >= 0 && index < sections.length) {
        isAnimating = true; // 애니메이션 시작
        const targetPosition = sections[index].offsetTop; // 목표 위치 (섹션의 상단 위치)
        const startPosition = window.scrollY; // 현재 스크롤 위치
        const distance = targetPosition - startPosition; // 이동해야 할 거리
        const duration = 300; // 스크롤 속도 (밀리초)
        let startTime = null;

        // 애니메이션 함수
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime; // 경과 시간
            const run = easeInOut(timeElapsed, startPosition, distance, duration); // 이동 위치 계산
            window.scrollTo(0, run); // 스크롤 이동
            if (timeElapsed < duration) {
                requestAnimationFrame(animation); // 애니메이션 계속 실행
            } else {
                currentSectionIndex = index; // 현재 섹션 인덱스 업데이트
                isAnimating = false; // 애니메이션 종료 후 상태 초기화
            }
        }

        // 스크롤 애니메이션 실행
        requestAnimationFrame(animation);
    }
}

// easeInOut 함수 (부드러운 스크롤 가속/감속 계산)
function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// 키 이벤트로 섹션 이동 처리
document.addEventListener("keydown", (e) => {
    if (e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault(); // 기본 페이지 다운 기능 비활성화
        quickScrollToSection(currentSectionIndex + 1); // 다음 섹션으로 이동
    } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault(); // 기본 페이지 업 기능 비활성화
        quickScrollToSection(currentSectionIndex - 1); // 이전 섹션으로 이동
    }
});

// 네비게이션 버튼 클릭 시 애니메이션 적용
document.querySelectorAll(".navbar a").forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // 기본 링크 기능 비활성화
        quickScrollToSection(index); // 해당 링크의 인덱스에 맞는 섹션으로 스크롤
    });
});

// 휠 이벤트로 섹션 간 이동
document.addEventListener("wheel", (e) => {
    if (isAnimating) return; // 애니메이션 중일 때는 실행하지 않음

    if (e.deltaY > 0) {
        // 휠 다운: 다음 섹션으로 이동
        quickScrollToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0) {
        // 휠 업: 이전 섹션으로 이동
        quickScrollToSection(currentSectionIndex - 1);
    }
});

// 페이지 로드 시 메인 섹션에서 시작
window.addEventListener("load", () => {
    // 브라우저의 스크롤 복원 기능 비활성화
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0); // 스크롤을 페이지 맨 위로 이동
    currentSectionIndex = 0; // 초기 섹션을 메인 섹션으로 설정
});

// 캐릭터 버튼 클릭 시 이미지 표시 색상 변경
document.querySelectorAll(".character-button").forEach(button => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color"); // 버튼의 데이터 속성에서 색상을 가져옴
        document.getElementById("imageDisplay").style.backgroundColor = color;
    });
});

// 페이지 로드 시 첫 번째 캐릭터 버튼이 눌린 상태로 시작
window.addEventListener("load", () => {
    const firstButton = document.querySelector(".character-button"); // 첫 번째 버튼 선택
    const characterImage = document.getElementById("characterImage");
    const characterText = document.getElementById("characterText");

    if (firstButton) {
        const image = firstButton.getAttribute("data-image"); // 첫 번째 버튼의 이미지
        const text = firstButton.getAttribute("data-text"); // 첫 번째 버튼의 텍스트

        // 이미지와 텍스트 설정
        characterImage.src = image;
        characterImage.style.display = "block"; // 이미지를 표시
        characterText.textContent = text; // 텍스트 설정
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".character-button");
    const characterImage = document.getElementById("characterImage");
    const characterText = document.getElementById("characterText");

    // 모든 버튼 클릭 이벤트 설정
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const image = button.getAttribute("data-image");
            const text = button.getAttribute("data-text").replace(/\|/g, '<br>'); // |을 <br>로 변환

            // 이미지 업데이트
            characterImage.src = image;
            characterImage.style.display = "block";

            // 텍스트 업데이트
            characterText.innerHTML = text;
        });

        // 페이지 로드 시 첫 번째 버튼의 클릭 로직 실행
        if (index === 0) {
            const firstImage = button.getAttribute("data-image");
            const firstText = button.getAttribute("data-text").replace(/\|/g, '<br>');

            // 이미지 및 텍스트 초기화
            characterImage.src = firstImage;
            characterImage.style.display = "block";
            characterText.innerHTML = firstText;
        }
    });
});
