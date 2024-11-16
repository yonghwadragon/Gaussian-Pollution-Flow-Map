// main.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 참조
    const graphTypeSelect = document.getElementById('graph-type-select');
    const pollutantSelect = document.getElementById('pollutant-select');
    const graphTitle = document.getElementById('graph-title');
    const sideViewImage = document.getElementById('side-view-image');
    const topGraphTitle = document.getElementById('top-graph-title');
    const topViewImage = document.getElementById('top-view-image');
    const currentTimeSpan = document.getElementById('current-time');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sideViewGraph = document.querySelector('.side-view-graph');
    const topViewGraph = document.querySelector('.top-view-graph');
    const timeIndicator = document.querySelector('.time-indicator');

    const totalHours = 24;
    let currentHour = 1;
    let isPlaying = false;
    const intervalTime = 1000; // 1초
    let intervalId;

    let currentPollutant = pollutantSelect.value;
    let currentGraphType = graphTypeSelect.value;

    // 업데이트 함수
    function updateImages() {
        if (currentGraphType === 'sideView') {
            // 옆에서 본 그래프 업데이트
            const hourString = String(currentHour).padStart(2, '0');
            sideViewImage.src = `${currentPollutant}/plot_11-01-${hourString}.png`;
            graphTitle.textContent = `${currentPollutant.toUpperCase()} 옆에서 본 그래프`;
            currentTimeSpan.textContent = `${currentHour}시`;
        } else if (currentGraphType === 'topView') {
            // 위에서 본 그래프 업데이트 (추후 구현)
            topViewImage.src = ''; // 이미지 경로 설정 필요
            topGraphTitle.textContent = `${currentPollutant.toUpperCase()} 위에서 본 그래프`;
        }
    }

    // 다음 시간으로 이동
    function nextHour() {
        currentHour = currentHour < totalHours ? currentHour + 1 : 1;
        updateImages();
    }

    // 이전 시간으로 이동
    function prevHour() {
        currentHour = currentHour > 1 ? currentHour - 1 : totalHours;
        updateImages();
    }

    // 재생/일시정지 토글
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(intervalId);
            playPauseBtn.textContent = '재생';
        } else {
            intervalId = setInterval(nextHour, intervalTime);
            playPauseBtn.textContent = '일시정지';
        }
        isPlaying = !isPlaying;
    }

    // 오염물질 변경 시 처리
    function changePollutant() {
        currentPollutant = pollutantSelect.value;
        currentHour = 1; // 시간 초기화
        updateImages();
    }

    // 그래프 유형 변경 시 처리
    function changeGraphType() {
        currentGraphType = graphTypeSelect.value;
        if (currentGraphType === 'sideView') {
            sideViewGraph.classList.remove('hidden');
            topViewGraph.classList.add('hidden');
            timeIndicator.classList.remove('hidden');
            playPauseBtn.textContent = '재생';
            clearInterval(intervalId);
            isPlaying = false;
            updateImages();
        } else if (currentGraphType === 'topView') {
            sideViewGraph.classList.add('hidden');
            topViewGraph.classList.remove('hidden');
            timeIndicator.classList.add('hidden');
            playPauseBtn.textContent = '재생';
            clearInterval(intervalId);
            isPlaying = false;
            updateImages();
        }
    }

    // 이벤트 리스너 설정
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', () => {
        nextHour();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });
    prevBtn.addEventListener('click', () => {
        prevHour();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });
    pollutantSelect.addEventListener('change', () => {
        changePollutant();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });
    graphTypeSelect.addEventListener('change', () => {
        changeGraphType();
    });

    // 초기 업데이트
    updateImages();
});