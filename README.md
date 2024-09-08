---
# 서비스 간단 소개

![dingon-banner](https://user-images.githubusercontent.com/107985535/199938463-11c0bfa0-f24d-4c00-9c17-67d915000edc.png)

* **Dingon은 커뮤니티 사이트 입니다. 자신만의 생각을 적고 남들과 공유해보세요.**

## Dingon
* 포스코 X 코딩온 KDT - 3차 프로젝트
* 2022.10.18 ~ 2022.10.27
* 사용 기술 : React, axios

## 제작 인원(5명)
* 우석우, 송기영, 윤경민, 문정우, 최원준

## 주요 기능

> Front : (윤경민)

- 마우스의 위치에 따라 로고의 눈동자가 움직임
- 로그인, 핫갤 박스
    - 전체적인 ui 및 ux
    - 삼항연산자를 사용하여 IsLogined(true, false) 값에 따른 ui 및 ux 변화.
    - 클라이언트가 입력한 정보를 axios를 활용하여 서버로 전송.
    - 포지션 sticky 적용 > 스크롤 이동 시 같이 움직이도록
    - 새로고침 아이콘을 누를 시 변경 된 state 값을 불러옴.

![dingon_login](https://user-images.githubusercontent.com/107985535/199942064-a2f61aa4-8960-4168-9bd8-17acb919aff7.gif)

- 마이페이지 > 나의 게시글
    - 전체적인 ui 및 ux
    - DB에 저장되어있는 나의 게시글을 axios를 활용하여 불러옴.
- 마이페이지 > 회원 정보 수정
    - 전체적인 ui 및 ux
    - axios를 활용하여 수정하는 정보를 넘겨줌.
    - 닉네임 변경 시 8글자 이하로 제한.
    
    ![dingon_mypage](https://user-images.githubusercontent.com/107985535/199942387-abd27801-de49-47af-8799-10dd53fcdfe7.gif)

    
* 노션 링크 : https://obsidian-tapir-ca1.notion.site/Dingon-fd8319428c2d45e0ba4b64751cdc2a6c
