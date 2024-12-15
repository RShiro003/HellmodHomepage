document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".character-button");
    const characterImage = document.getElementById("characterImage");
    const characterText = document.getElementById("characterText");
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0;
    let isAnimating = false; // 애니메이션 상태를 저장하는 변수

<<<<<<< HEAD
    // 저장된 버튼 인덱스 가져오기
    const savedButtonIndex = localStorage.getItem("selectedButtonIndex");

    // 페이지 로드 시 저장된 버튼 초기화
    if (savedButtonIndex !== null && buttons[savedButtonIndex]) {
        const savedButton = buttons[savedButtonIndex];
        updateCharacterDisplay(savedButton, savedButtonIndex);
    } else if (buttons.length > 0) {
        // 저장된 값이 없으면 첫 번째 버튼을 초기화
        updateCharacterDisplay(buttons[0], 0);
=======
    // 페이지 로드 시 첫 번째 버튼 초기화
    if (buttons.length > 0) {
        const firstButton = buttons[0];
        const firstImage = firstButton.getAttribute("data-image");
        const firstText = firstButton.getAttribute("data-text").replace(/\|/g, '<br>');

        characterImage.src = firstImage;
        characterImage.style.display = "block";
        characterText.innerHTML = firstText;
>>>>>>> 24cd5a6986453e8c7e9f87c2d4b296b208b0078b
    }

    // 각 버튼 클릭 이벤트 설정
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
<<<<<<< HEAD
            updateCharacterDisplay(button, index);
            // 선택한 버튼의 인덱스를 로컬 스토리지에 저장
            localStorage.setItem("selectedButtonIndex", index);
=======
            const image = button.getAttribute("data-image");
            const text = button.getAttribute("data-text").replace(/\|/g, '<br>');

            characterImage.src = image;
            characterImage.style.display = "block";
            characterText.innerHTML = text;
>>>>>>> 24cd5a6986453e8c7e9f87c2d4b296b208b0078b
        });
    });

    // 이미지, 텍스트, 버튼 상태를 업데이트하는 함수
    function updateCharacterDisplay(button, index) {
        const image = button.getAttribute("data-image");
        const text = button.getAttribute("data-text").replace(/\|/g, '<br>'); // |을 <br>로 변환

        // 이미지 및 텍스트 업데이트
        characterImage.src = image;
        characterImage.style.display = "block";
        characterText.innerHTML = text;

        // 모든 버튼에서 선택된 상태 제거
        buttons.forEach(btn => btn.classList.remove("selected"));
        // 선택된 버튼에 'selected' 클래스 추가
        button.classList.add("selected");
    }

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
});

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;

    // 슬라이드 이동 함수
    function moveSlide(index) {
        const offset = -index * 100; // 슬라이드 너비를 기준으로 이동
        slider.style.transform = `translateX(${offset}%)`;
        currentIndex = index;
    }

    // 이전 버튼 클릭 이벤트
    prevButton.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveSlide(newIndex);
    });

    // 다음 버튼 클릭 이벤트
    nextButton.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slides.length;
        moveSlide(newIndex);
    });

    // 페이지 로드 시 첫 번째 슬라이드 표시
    window.addEventListener('load', () => {
        moveSlide(0);
    });
});
