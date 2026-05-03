# 📁 Chat Messenger (React)

> 간단한 채팅 UI에서 텍스트 메시지 전송과 파일 업로드/미리보기/다운로드 기능을 제공하는 React 프로젝트입니다.
</br>[구경가기](https://hyun-june.github.io/react_chatting_UI/)

<p align="center">
<img src="https://github.com/hyun-june/react_chatting_UI/blob/main/public/images/preview.png?raw=true" alt="채팅 이미지 예시" width="400" />
</p>

### ✨ 주요 기능

- 💬 텍스트 기반 채팅 메시지 전송
- 📎 이미지, PDF, 기타 파일 업로드 및 전송
- 🖼 이미지 미리보기 지원 (JPEG, PNG 등)
- 📄 PDF 링크로 열기 지원
- ⬇ 기타 파일 다운로드 지원
- 🔄 Object URL 정리로 메모리 누수 방지

## 💻 사용법

#### 1. 메시지 입력

- 메시지 입력창에 내용을 작성 후 `Enter`키 또는 🔺 버튼 클릭

#### 2. 파일 업로드

- ➕ 버튼 클릭 → 파일 선택 (이미지, PDF, 기타)
- 이미지: 채팅창에 미리보기 및 클릭 시 새탭에서 열림
- PDF: 새 탭에서 열림
- 기타: 다운로드 링크로 제공됨

#### 3. 파일 삭제

- 입력창에 파일명이 보일 때 `BackSpace` 키로 선택 취소

## 🧩 컴포넌트 구성

- App.js: 전체 앱 및 상태 관리
- `FileContent.js`: 파일 타입에 따라 렌더링
  - 이미지, PDF, 기타 파일에 따라 UI 출력
