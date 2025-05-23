# SPEECHFY

> 내 목소리로 여러 악기들을 연주하고 음악 자동완성을 통해 쉬운 작곡을 제공하는 서비스

# 📌 목차

### 1️⃣ [팀원 소개](#1-팀원-소개)

### 2️⃣ [서비스 소개](#2-서비스-소개)

### 3️⃣ [서비스 화면](#3-서비스-화면)

### 4️⃣ [개발 환경](#4-개발-환경)

### 5️⃣ [기술 특이점](#5-기술-특이점)

### 6️⃣ [기획 및 설계 산출물](#6-기획-및-설계-산출물)

### 7️⃣ [Conventions](#7-conventions)

### 8️⃣ [개발 회고](#8-개발-회고)

<br/>

# 1. 팀원 소개

&nbsp;

## 💞 팀원 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="/">
            <img src="/" width="140px" /> <br><br> 이해루 <br>(Team Leader, Front-end, AI) </a> <br></td>
        <td height="140px" align="center"> <a href="/">
            <img src="/" width="140px" /> <br><br> 강성엽 <br>(Front-end) </a> <br></td>
        <td height="140px" align="center"> <a href="/">
            <img src="https://avatars.githubusercontent.com/u/79686751?v=4" width="140px" /> <br><br> 정윤선 <br>(Back-end, AI) </a> <br></td>
        <td height="140px" align="center"> <a href="/">
            <img src="/" width="140px" /> <br><br> 고대권 <br>(Back-end) </a> <br></td>
        <td height="140px" align="center"> <a href="/">
            <img src="/" width="140px" /> <br><br> 정진용 <br>(Back-end) </a> <br></td>
        <td height="140px" align="center"> <a href="/">
            <img src="/" width="140px" /> <br><br> 지수인 <br>(Back-end, Infra) </a> <br></td>
    </tr>
    <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
    </tr>
</table>

&nbsp;

# 🎧 2. 서비스 소개

SPEECHFY는 음성 기반으로 작곡을 할 수 있도록 도와주는 인공지능 작곡 도구입니다.
<br>
사용자가 직접 녹음한 허밍이나 음성을 다양한 악기 소리로 변환하고 생성된 사운드를 바탕으로 자동 작곡까지 할 수 있습니다.
<br>
작곡에 필요한 전문 장비나 악기 연주 능력이 없어도 누구나 손쉽게 음악을 만들 수 있는 새로운 창작 환경을 제공하여 유저들이 쉽고 빠르게 곡을 스케치하고 공유할 수 있도록 돕는 데 중점을 두었습니다.

&nbsp;

## 📆 프로젝트 기간

### 2025.02.24 ~ 2025.04.11

- **기획 및 설계**: 2025.02.24 ~ 2025.03.07
- **프로젝트 구현**: 2025.03.10 ~ 2025.04.02
- **버그 수정 및 산출물 정리**: 2025.04.03 ~ 2025.04.10

&nbsp;

## 🎵 주요 기능

### 🎤 음성을 악기 소리로 변환 (AI 기반 음성 → 악기 변환)

- 사용자가 녹음한 음성(허밍 등)을 인공지능이 학습된 악기 소리로 변환
- 변환 가능한 악기 예시: 바이올린, 트럼펫, 드럼, 색소폰 등
- 사용자는 원하는 악기를 선택하여 녹음 후, 해당 악기 사운드로 자동 변환 가능

### 🎼 AI 기반 자동 작곡

- 변환된 사운드 샘플을 기반으로, 장르(예: 팝, 재즈, 힙합) 및 분위기(예: 따뜻한, 낭만적인, 심플한)를 입력하면 AI가 자동으로 작곡
- 완성된 곡에 어울리는 앨범 커버 이미지도 이미지 생성 AI를 통해 자동 생성

### 🧰 작업실 단위의 프로젝트 관리

- 사용자는 작업실(프로젝트) 별로 사운드를 관리하고 작곡 가능
- 사운드 트랙을 복제하거나 다른 악기로 변환 가능 (예: 바이올린 트랙을 드럼으로 전환)
- 여러 사운드를 조합하여 멀티 트랙 기반의 편곡 가능

### 📤 완성곡 공유 기능

- 완성된 곡을 외부로 공유할 수 있는 기능 제공

### 🕒 메트로놈 기능 (녹음 보조 도구)

- 녹음 시 템포 유지를 위한 메트로놈 제공

&nbsp;

## 🔧 기술 스택

### **프론트엔드**

- NextJS 15.2.2
- ReactJS 19.0.
- TailwindCSS 4
- TypeScript 5
- Zustand 5.0.3
- React-Query 5.69.0
- MSW 2.7.3
- TensorflowJS 2.7.0

### **백엔드**

- Spring Boot 3.4.3
- MySQL 8.0.33
- Spring Data JPA
- FastAPI
- EC2
- S3
- CloudFront
- Docker
- Jenkins
- Nginx

### **AI 기술**

- DDSP
- MAGENTA
- MusicVAE
- MusicGen

&nbsp;

# 3. 서비스 화면

<img src="./assets/StudioPage.png" width="100%">
<img src="./assets/SongPage.png" width="100%">
<img src="./assets/TrackPage.png" width="100%">

&nbsp;

# 4. 개발 환경

<img src="./assets/Architecture.png" width="100%">

# 5. 기술 특이점

&nbsp;

## ⭐ 서비스 특장점

### 🎼 누구나 쉽게 시작할 수 있는 AI 작곡 도구

SPEECHFY는 허밍만으로도 작곡이 가능해 작곡 경험이 없는 사용자도 부담 없이 시작할 수 있습니다. 별도의 장비나 악기 연주 능력이 없어도 목소리만으로 작곡 아이디어를 스케치하고 완성된 곡을 만들 수 있습니다.

### 🥁 다양한 악기 사운드와 편곡 기능

사용자가 녹음한 음성은 AI를 통해 다양한 악기 소리(바이올린, 드럼, 트럼펫 등)로 변환되며 여러 악기를 다루지 못해도 멀티 트랙 편곡이 가능합니다.
트랙을 복제하거나 다른 악기로 교체하는 기능도 제공되어 혼자서도 다채로운 편곡이 가능합니다.

### 🤖 AI가 완성하는 음악과 커버 이미지

장르(팝, 재즈, 힙합 등)와 분위기(낭만적인, 심플한 등)를 입력하면 AI가 자동으로 곡을 완성하고 해당 곡의 분위기에 어울리는 앨범 커버 이미지까지 함께 생성해줍니다.

### 📤 공유까지 가능한 통합 창작 환경

생성된 음악과 커버 이미지는 클릭 한 번으로 공유할 수 있으며 작업실(프로젝트) 단위로 작업 내역을 관리할 수 있어 지속적인 창작이 가능합니다.

## 💡 프로젝트의 차별점

### 🎙 음성 기반의 직관적인 창작 방식

기존 AI 작곡 도구들이 텍스트나 시퀀서 기반 입력을 요구하는 것과 달리 SPEECHFY는 단순한 음성(허밍) 입력만으로 곡 제작이 가능해 훨씬 직관적이고 쉽게 접근할 수 있습니다.

### 🧠 작곡부터 공유까지 가능한 All-in-One 플랫폼

단순한 음악 생성 도구를 넘어서 음원 변환, 편집, 앨범 커버 생성, 공유 기능까지 음악 창작에 필요한 모든 과정을 하나의 플랫폼에서 제공합니다.

### ⚙️ 클라이언트 기반 AI 모델 연산 구조

사용자의 음성을 악기 소리로 변환하는 AI 모델은 직접 학습한 전용 모델이며
TensorFlow.js를 활용해 클라이언트 브라우저에서 직접 연산되도록 구현되어
서버 부하를 줄이고 빠른 속도와 확장성을 동시에 확보했습니다.

### 🌐 효율적인 파일 접근 및 통신 구조

변환된 오디오는 AWS S3에 저장되며 CloudFront를 통해 생성된 주소로
프론트엔드에서 직접 접근할 수 있어 서버를 거치지 않고도 빠르게 처리됩니다. 이 구조는 통신 비용 절감과 성능 최적화를 동시에 실현합니다.

&nbsp;

# 6. 기획 및 설계 산출물

### 기획서
https://www.notion.so/1b2aeb5043cd807fab49c8fc69e408d8

### 요구사항 명세서
https://www.notion.so/1b2aeb5043cd808894dfc5f5a37bd2cb

### 기능 명세서
https://www.notion.so/1b4aeb5043cd8036918cece13e3d6487

https://www.notion.so/1b2aeb5043cd808894dfc5f5a37bd2cb?pvs=25

### 와이어프레임
https://www.figma.com/design/tkHgoXYqvnjhWHutcCX9OX/SPEECHFY?node-id=110-1923&p=f&t=bGhSZgzGGDYOuHff-0

### ERD

https://www.erdcloud.com/d/ehpySmpdqhvmuiFdQ

### API 명세서
https://www.notion.so/API-1b9aeb5043cd8082bda5f5a431fb8040

https://www.notion.so/API-1b9aeb5043cd8082bda5f5a431fb8040?pvs=25

&nbsp;

# 7. Conventions

### Branch Convention

- 기능명
  - `feature` : 새로운 기능을 개발
  - `style` : UI/UX 변경
  - `bug` : 에러 해결
  - `refactoring` : 코드 수정
- 각 기능 별 Branch
  > FE-{기능별 브랜치 전략}
  > <br>BE-{기능별 브랜치 전략}
  > <br>ex) FE-feat/login

### commit

#### Commit Message Structure

- 기본적인 commit message 구조
  ```
  type: subject
  ```
- **type**: 어떤 의도로 커밋을 했는지 명시합니다. (ex. feat, refactor)
- **Subject**: 코드 변경사항을 요약해서 작성합니다. 영문으로 표기하고 마침표는 찍지 않습니다.

#### Commit Type

| Tag Name | Description                                 |
| -------- | ------------------------------------------- |
| feat     | 새로운 기능 추가                            |
| fix      | 버그 수정                                   |
| remove   | 파일 삭제                                   |
| docs     | 문서 수정                                   |
| add      | package 추가                                |
| style    | 코드 포맷팅, 세미 콜론 누락, 코드 변경 없음 |
| refactor | 코드 리팩토링                               |
| test     | 테스트 코드 추가                            |
| chore    | 빌드 업무 수정, 패키지 매니저 수정          |

&nbsp;
