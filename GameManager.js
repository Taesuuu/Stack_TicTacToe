
/* 

 1. 9개의 놓을 수 있는 공간을 제공하고 9개의 게임 판에서만 돌을 놓을 수 있다.
 2. 선공 후공을 정한 후 순서대로 9개의 공간 중 하나의 돌을 놓는다. - 선공이 O 후공이 X
 3. 플레이어가 놓은 돌이 가로, 세로, 대각선 중 하나와 일치하면 승리한다. 


 자신의 돌 좌 우 대각선에 자신의 돌과 똑같은 돌이 2가지 놓여있다면 플레이어가 승리

 처음 돌을 놓았을 경우부터 9개 확인해서 bool 값으로 게임이 끝났는지 확인하는 경우

 0 1 2, 0 3 6, 0 4 8
 1 4 7,  
 2 5 8, 2 4 6
 3 4 5,
 6 7 8,  
 < 승리 조건 배열에 이럴 때 같은 데이터가 있다면 같은 데이터가 있는 플레이어가 승리
        // 선택 시 1번 플레이어는 1을 저장 2번 플레이어는 2를 저장해서 MAP에 들어있는 배열 값이 1 혹은 2라면 1이라면 O를 표시 2라면 X를 표시해준다.
        // 위에 적은 조건을 승리조건으로 두고 조건이 같다면 해당 플레이어의 승리
        // 승리 조건에 맞지 않다면 알람창을 띠우고 다시 init 함수를 실행해서 처음으로 돌아갈 수 있도록 구성

        // 0 1 2
        // 3 4 5
        // 6 7 8

        // 0 : 게임오버 - 무승부 -  9개의 MAP이 전부 데이터가 들어있고 한 줄을 완성 못하는 상황일 때 무승부
        // 1 : 게임오버 - O 승리 - 
        // 2 : 게임오버 - X 승리 - 
        // 3 : 게임 플레이 중 - O 턴 - bool을 이용해서 true일 때 O만 입력 가능
        // 4 : 게임 플레이 중 - X 턴 - bool을 이용해서 false일 때 X만 입력 가능

    처음 시작 할 때 라디오 버튼으로 O X 선공 후공 정할 수 있도록 설정?


    하나 입력시 자동으로 1 2 3 중 하나를 선택해서 입력한다면 그게 AI지 않을까? 

    원래 승부가 나는 조건에서 들어있는 부분의 value를 null로 바꾸고 imglink를 다시 null로 바꾸고 없어진 부분보다 높은 곳이 있다면 그 위에 있는걸 아래로 내리고 점수를 + 1점 해주는 방식?
    배열 순서가 
    0
    1
    2 니까 2에서 걸렸다면 그 위에 있는 부분의 값을 내껄로 가지고 오고 그 위에 있는 부분도 그 위에 부분으로 가지고 오는 방식
    점수 ++ 해주고 사라지고 value = null / imglink = null 

    게임 종료 시 랭킹 띠우는 것처럼 띠우는 방법?


*/

class GameManager {
    constructor(){
        
        this.GameOver = true;
        this.turn = GameManager.O;
        this.GameState = 0;
        this.count = 0;

        this.GameMap1 = new Array(3).fill().map(s => new maptile() );
        this.GameMap2 = new Array(3).fill().map(s => new maptile() );
        this.GameMap3 = new Array(3).fill().map(s => new maptile() );

        this.checkValue = new Array(3);
        // console.log("여까진 오나1");
        // 플레이어를 새로 저장 player 안에는 이름, 이긴 횟수, 진 횟수, 비긴 횟수가 들어 있음
        this.player1 = new player();
        this.player2 = new player();
        
        this.gameview = false;
        
        this.grabdata = null;
        this.grabO = false;
        this.grabX = false;

    }

    init(){
        this.GameOver = true;
        this.turn = GameManager.O;
        this.GameState = 0;
        this.count = 0;
        this.grabdata = null;
        this.grabO = false;
        this.grabX = false;
        this.checkValue = new Array(3);

        this.GameMap1 = new Array(3).fill().map(s => new maptile() );
        this.GameMap2 = new Array(3).fill().map(s => new maptile() );
        this.GameMap3 = new Array(3).fill().map(s => new maptile() );


        // this.GameMap = new Array(9).fill().map(s => new maptile() );
    }
        /* 
            일단 누르는건 count가 6이하일 떄 아무곳이나 눌렀을 때 쌓이도록 설정 하고 
            그 이후에는 눌렀을 때 자신의 같은 value 값만 뺄 수 있도록 설정하고 왔다갔다 할 수 있도록 단 누른 곳에 3개 전부 다 차있다면 넣을 수 없다고 alart창으로 띄움
            결과 확인은 똑같이 하면 될 듯
            딜레마 3D 틱택토 만들기 
            input을 실행 했을 때 조건이 3가지 
            1. count가 6 이하 일 때 즉 게임 화면에 O 3개 X 3개보다 적을 경우 아무곳이나 눌렀을 때 O or X를 추가하는 코드
            2. count가 6 보다 클 경우 그때는 GameStage가 같고 맨 위에 올려져 있는 값에 value가 지금 턴인 사람과 동일 하다면 뺄 수 있고 이 중 아무것도 해당이 없다면 옮길 수 없음
            3. 전부 다 차있다면 여기에는 놓을 수 없다고 alart창 출력

            누른 곳에 인덱스번호가 2번을 먼저 value가 null 인지 확인 후 null이라면 강제로 value를 넣어주고 
            아니라면 for문을 통해 !== null 번호 확인 후 -1해서 그 위에 다가 입력하는 방식

            * 넘어오는 오브젝트는 이걸 감싸고 있는 game-map1, 2, 3 오브젝트가 넘어오고 있음 이걸 넘어오면 GameMap1, 2, 3을 내가 맞춰서 값을 넣어주는 방식 



            O와 X는 게임 화면에 6개만 출력되어야 한다 > count 변수가 6이상일 때 입력 할 수 없도록 막아주면 될 듯  < OK
            제일 위에 있는 변수의 값을 확인해서 값을 빼고 넣고 
            EX) 누른 곳이 map2번을 눌렀을 때 지금 빼는 차례가 O의 턴이다 하면 map2에 제일 위에 있는 value값을 확인해서 O라면 true 아니라면 false를 반환해서 alart창으로 뺄 수 없다 띠움  < OK
            for문으로 배열을 새로 만들어서 거기서 확인하는 방법은? < OK 했음 


        */
    input(i){
        if(this.GameOver){


        console.log(i);
        if(i.id == "game-map1"){
            console.log("1번");
            if(this.count >= 6){

                for(var i = 0; i < 3; i++){
                    this.checkValue[i] = this.GameMap1[i].value; 
                }
                console.log(this.checkValue);

                for(var i = 0; i < 3; i++){
                    if(this.grabdata === null){

                    
                     if(this.checkValue[i] !== null){
                          console.log(this.checkValue[i]);
                          if(this.checkValue[i] === GameManager.O && this.GameState === 6 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                             console.log("O를 뻈습니다");
                              this.grabdata = this.checkValue[i];
                              this.grabO = true;
                              this.count++;
                              this.GameMap1[i].value = null;
                              this.GameMap1[i].showimg();
                              this.GameMap1[i].isshow = false;
                              return;
                            
                        }
                        else if(this.checkValue[i] === GameManager.X && this.GameState === 7 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                            console.log("X를 뻈습니다");
                            this.grabdata = this.checkValue[i];
                            this.grabX = true;
                            this.count++;
                            this.GameMap1[i].value = null;
                            this.GameMap1[i].showimg();
                            this.GameMap1[i].isshow = false;
                            return;
                        }
                        else {
                            alert("나의 턴에서만 옮길 수 있습니다");
                            return;
                        }
                    }
                }
                }
                if(this.GameMap1[0].value !== null){
                    alert("여긴 놓을 수 없습니다.");
                    return;
                }
                if(this.grabO && this.GameState === 8){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("O를 넣었습니다");
                            this.GameMap1[2].value = this.grabdata;
                            this.GameMap1[2].isshow = true;
                            this.GameMap1[2].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("O를 넣었습니다");
                            this.GameMap1[i-1].value = this.grabdata;
                            this.GameMap1[i-1].isshow = true;
                            this.GameMap1[i-1].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                else if(this.grabX && this.GameState === 9){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("X를 넣었습니다");
                            this.GameMap1[2].value = this.grabdata;
                            this.GameMap1[2].isshow = true;
                            this.GameMap1[2].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("X를 넣었습니다");
                            this.GameMap1[i-1].value = this.grabdata;
                            this.GameMap1[i-1].isshow = true;
                            this.GameMap1[i-1].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                // for(var i = 0; i < 3; i++){
                //     if(this.GameMap1[i].value !== null){
                //         if(this.GameMap1[i].value === GameManager.O && this.GameState === 6){
                //             console.log("O를 뻈습니다");
                //             this.grabdata = this.GameMap1[i].value;
                //             this.GameMap1[i].value = null;
                //             this.GameMap1[i].isshow = false;
                //             this.GameMap1[i].showimg();
                //             this.grabO = true;
                //             break;
                //         }
                //         else if(this.GameMap1[i].value === GameManager.X && this.GameState === 7){
                //             console.log("X를 뻈습니다");
                //             this.grabdata = this.GameMap1[i].value;
                //             this.GameMap1[i].value = null;
                //             this.GameMap1[i].showimg();
                //             this.GameMap1[i].isshow = false;
                //             this.grabX = true;
                //             break;
                //         }
                //     }
                // }

                // if(this.grabO && this.GameState === 8 && this.grabdata === GameManager.O)
                // {
                //     // 잡은걸 놓는 영역
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap1[2].value === null){
                //             this.GameMap1[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap1[2].isshow = true;
                //             this.GameMap1[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                            
                //             break;
                //         }

                //         if(this.GameMap1[i].value !== null){
                //             this.GameMap1[i-1].value =this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap1[i-1].isshow = true;
                //             this.GameMap1[i-1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                //             break;
                //         }
                //     }
                // }
                // else if(this.grabX && this.GameState === 9 && this.grabdata === GameManager.X)
                // {
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap1[2].value === null){
                //             this.GameMap1[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap1[2].isshow = true;
                //             this.GameMap1[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }

                //         if(this.GameMap1[i].value !== null){
                //             this.GameMap1[i-1].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap1[i-1].isshow = true;
                //             this.GameMap1[i-1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }
                //     }
                // }



                // if(this.GameMap1[2].value === null){
                //     this.GameMap1[2].value = this.grabdata;
                //     this.GameMap1[2].showimg();
                //     this.GameMap1[2].isshow = true;
                //     this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                // }
            }
            else {
                if(this.GameMap1[2].value == null){
                    this.GameMap1[2].push(this.turn);
                    this.GameMap1[2].isshow = true;
                    this.GameMap1[2].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                } else if(this.GameMap1[1].value == null){
                    this.GameMap1[1].push(this.turn);
                    this.GameMap1[1].isshow = true;
                    this.GameMap1[1].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }else if(this.GameMap1[0].value == null){
                    this.GameMap1[0].push(this.turn);
                    this.GameMap1[0].isshow = true;
                    this.GameMap1[0].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }
            }
           
        }
        if(i.id == "game-map2"){
            console.log("2번");
            if(this.count >= 6){
                for(var i = 0; i < 3; i++){
                    this.checkValue[i] = this.GameMap2[i].value; 
                }
                console.log(this.checkValue);

                for(var i = 0; i < 3; i++){
                    if(this.grabdata === null){

                    
                     if(this.checkValue[i] !== null){
                          console.log(this.checkValue[i]);
                          if(this.checkValue[i] === GameManager.O && this.GameState === 6 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                             console.log("O를 뻈습니다");
                              this.grabdata = this.checkValue[i];
                              this.grabO = true;
                              this.count++;
                              this.GameMap2[i].value = null;
                              this.GameMap2[i].showimg();
                              this.GameMap2[i].isshow = false;
                              return;
                            
                        }
                        else if(this.checkValue[i] === GameManager.X && this.GameState === 7 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                            console.log("X를 뻈습니다");
                            this.grabdata = this.checkValue[i];
                            this.grabX = true;
                            this.count++;
                            this.GameMap2[i].value = null;
                            this.GameMap2[i].showimg();
                            this.GameMap2[i].isshow = false;
                            return;
                        }
                        else {
                            alert("나의 턴에서만 옮길 수 있습니다");
                            return;
                        }
                    }
                }
                }
                if(this.GameMap2[0].value !== null){
                    alert("여긴 놓을 수 없습니다.");
                    return;
                }
                if(this.grabO && this.GameState === 8){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("O를 넣었습니다");
                            this.GameMap2[2].value = this.grabdata;
                            this.GameMap2[2].isshow = true;
                            this.GameMap2[2].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("O를 넣었습니다");
                            this.GameMap2[i-1].value = this.grabdata;
                            this.GameMap2[i-1].isshow = true;
                            this.GameMap2[i-1].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                else if(this.grabX && this.GameState === 9){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("X를 넣었습니다");
                            this.GameMap2[2].value = this.grabdata;
                            this.GameMap2[2].isshow = true;
                            this.GameMap2[2].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("X를 넣었습니다");
                            this.GameMap2[i-1].value = this.grabdata;
                            this.GameMap2[i-1].isshow = true;
                            this.GameMap2[i-1].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                // for(var i = 0; i < 3; i++){
                //     if(this.GameMap2[i].value !== null){
                //         if(this.GameMap2[i].value === GameManager.O && this.GameState === 6){
                //             console.log("O를 뻈습니다");
                //             this.grabdata = this.GameMap1[i].value;
                //             this.GameMap2[i].value = null;
                //             this.GameMap2[i].isshow = false;
                //             this.GameMap2[i].showimg();
                //             this.grabO = true;
                //             return;
                //         }
                //         else if(this.GameMap2[i].value === GameManager.X && this.GameState === 7){
                //             console.log("X를 뻈습니다");
                //             this.grabdata = this.GameMap2[i].value;
                //             this.GameMap2[i].value = null;
                //             this.GameMap2[i].showimg();
                //             this.GameMap2[i].isshow = false;
                //             this.grabX = true;
                //             return;
                //         }
                //     }
                // }

                // if(this.grabO && this.GameState === 8 && this.grabdata === GameManager.O)
                // {
                //     // 잡은걸 놓는 영역
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap2[2].value === null){
                //             this.GameMap2[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap2[2].isshow = true;
                //             this.GameMap2[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                //             break;
                //         }

                //         if(this.GameMap2[i].value !== null){
                //             this.GameMap2[i-1].value =this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap2[i-1].isshow = true;
                //             this.GameMap2[i-1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                //             break;
                //         }
                //     }
                // }
                // else if(this.grabX && this.GameState === 9 && this.grabdata === GameManager.X)
                // {
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap2[2].value === null){
                //             this.GameMap2[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap2[2].isshow = true;
                //             this.GameMap2[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }

                //         if(this.GameMap2[i].value !== null){
                //             this.GameMap2[i-1].value =this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap2[i-1].isshow = true;
                //             this.GameMap2[i-1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }
                //     }
                // }
            }
            else {
                if(this.GameMap2[2].value == null){
                    this.GameMap2[2].push(this.turn);
                    this.GameMap2[2].isshow = true;
                    this.GameMap2[2].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return ;
                } else if(this.GameMap2[1].value == null){
                    this.GameMap2[1].push(this.turn);
                    this.GameMap2[1].isshow = true;
                    this.GameMap2[1].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }else if(this.GameMap2[0].value == null){
                    this.GameMap2[0].push(this.turn);
                    this.GameMap2[0].isshow = true;
                    this.GameMap2[0].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }
            }
            
        }
        if(i.id == "game-map3"){
            console.log("3번");
            if(this.count >= 6){
                for(var i = 0; i < 3; i++){
                    this.checkValue[i] = this.GameMap3[i].value; 
                }
                console.log(this.checkValue);

                for(var i = 0; i < 3; i++){
                    if(this.grabdata === null){

                    
                     if(this.checkValue[i] !== null){
                          console.log(this.checkValue[i]);
                          if(this.checkValue[i] === GameManager.O && this.GameState === 6 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                             console.log("O를 뻈습니다");
                              this.grabdata = this.checkValue[i];
                              this.grabO = true;
                              this.count++;
                              this.GameMap3[i].value = null;
                              this.GameMap3[i].showimg();
                              this.GameMap3[i].isshow = false;
                              return;
                            
                        }
                        else if(this.checkValue[i] === GameManager.X && this.GameState === 7 && !this.grabO && !this.grabX && this.checkValue[i] === this.turn){
                            console.log("X를 뻈습니다");
                            this.grabdata = this.checkValue[i];
                            this.grabX = true;
                            this.count++;
                            this.GameMap3[i].value = null;
                            this.GameMap3[i].showimg();
                            this.GameMap3[i].isshow = false;
                            return;
                        }
                        else {
                            alert("나의 턴에서만 옮길 수 있습니다");
                            return;
                        }
                    }
                }
                }
                if(this.GameMap3[0].value !== null){
                    alert("여긴 놓을 수 없습니다.");
                    return;
                }
                if(this.grabO && this.GameState === 8){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("O를 넣었습니다");
                            this.GameMap3[2].value = this.grabdata;
                            this.GameMap3[2].isshow = true;
                            this.GameMap3[2].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("O를 넣었습니다");
                            this.GameMap3[i-1].value = this.grabdata;
                            this.GameMap3[i-1].isshow = true;
                            this.GameMap3[i-1].showimg();
                            this.grabO = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                else if(this.grabX && this.GameState === 9){
                    for(var i = 0; i < 3; i++){
                        if(this.checkValue[2] === null){
                            console.log("X를 넣었습니다");
                            this.GameMap3[2].value = this.grabdata;
                            this.GameMap3[2].isshow = true;
                            this.GameMap3[2].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                        if(this.checkValue[i] !== null){
                            console.log("X를 넣었습니다");
                            this.GameMap3[i-1].value = this.grabdata;
                            this.GameMap3[i-1].isshow = true;
                            this.GameMap3[i-1].showimg();
                            this.grabX = false;
                            this.grabdata = null;
                            this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                            return;
                        }
                    }
                }
                // for(var i = 0; i < 3; i++){
                //     if(this.GameMap3[i].value !== null){
                //         if(this.GameMap3[i].value === GameManager.O && this.GameState === 6){
                //             console.log("O를 뻈습니다");
                //             this.grabdata = this.GameMap3[i].value;
                //             this.GameMap3[i].value = null;
                //             this.GameMap3[i].isshow = false;
                //             this.GameMap3[i].showimg();
                //             this.grabO = true;
                //             return;
                //         }
                //         else if(this.GameMap3[i].value === GameManager.X && this.GameState === 7){
                //             console.log("X를 뻈습니다");
                //             this.grabdata = this.GameMap1[i].value;
                //             this.GameMap3[i].value = null;
                //             this.GameMap3[i].showimg();
                //             this.GameMap3[i].isshow = false;
                //             this.grabX = true;
                //             return;
                //         }
                //     }
                // }

                // if(this.grabO && this.GameState === 8 && this.grabdata === GameManager.O)
                // {
                //     // 잡은걸 놓는 영역
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap3[2].value === null){
                //             this.GameMap3[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap3[2].isshow = true;
                //             this.GameMap3[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                //             break;
                //         }

                //         if(this.GameMap3[i].value !== null){
                //             this.GameMap3[i-1].value =this.grabdata;
                //             this.grabdata = null;
                //             this.grabO = false;
                //             this.GameMap3[i-1].isshow = true;
                //             this.GameMap3[i-1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("O를 넣었습니다");
                //             break;
                //         }
                //     }
                // }
                // else if(this.grabX && this.GameState === 9 && this.grabdata === GameManager.X)
                // {
                //     for(var i = 0; i < 3; i++){
                //         if(this.GameMap3[2].value === null){
                //             this.GameMap3[2].value = this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap3[2].isshow = true;
                //             this.GameMap3[2].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }

                //         if(this.GameMap3[i].value !== null){
                //             this.GameMap3[i -1].value =this.grabdata;
                //             this.grabdata = null;
                //             this.grabX = false;
                //             this.GameMap3[i - 1].isshow = true;
                //             this.GameMap3[i - 1].showimg();
                //             this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                //             console.log("X를 넣었습니다");
                //             break;
                //         }
                //     }
                // }
            }
            else {
                if(this.GameMap3[2].value == null){
                    this.GameMap3[2].push(this.turn);
                    this.GameMap3[2].isshow = true;
                    this.GameMap3[2].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                } else if(this.GameMap3[1].value == null){
                    this.GameMap3[1].push(this.turn);
                    this.GameMap3[1].isshow = true;
                    this.GameMap3[1].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }else if(this.GameMap3[0].value == null){
                    this.GameMap3[0].push(this.turn);
                    this.GameMap3[0].isshow = true;
                    this.GameMap3[0].showimg();
                    this.count++;
                    this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
                    return;
                }
            }
           
        }
     }
        // 여기는 정삭적으로 누른곳에 값을 넣는 코드 아래
        // console.log("여까진 오나2");
        // console.log(i);
        // if(!this.GameMap[i].value && this.GameOver){
        //     this.GameMap[i].value = this.turn;
        //     this.count++;            
        //     this.turn = (this.turn === GameManager.O) ? GameManager.X : GameManager.O;
        // }
    }
     
    Update(){
        // MAP에 들어있는 데이터를 확인해서 표시
        // GameState 가 0 일 때 무승부,
        //  1 일때 O 승리 
        //  2 일때 X 승리 
        //  3 일때 O의 턴 
        //  4 일때 X의 턴
        console.log("실행 중");

        if(this.GameOver == false){
            return;
        }
        if(this.count < 6){
            if(this.turn === GameManager.O){
                this.GameState = 3;
            }else{
                this.GameState = 4;            
            }
        }
        else if(this.count >= 6){
            if(this.turn === GameManager.O){
                if(this.grabO){
                    this.GameState = 8;
                }
                else 
                {
                    this.GameState = 6;
                }
                
            }else{
                if(this.grabX){
                    this.GameState = 9;
                }
                else 
                {
                    this.GameState = 7; 
                }
                           
            }
        }
       
    

        // if(this.count === 9){
        //     this.GameOver = false;
        //     this.GameState = 0;
        //     this.player1.drawCount++;
        //     this.player2.drawCount++;
        // }
        // 0 1 2, 0 3 6, 0 4 8
        // 1 4 7,  
        // 2 5 8, 2 4 6
        // 3 4 5,
        // 6 7 8,
        // map1 map2 map3
        //  0    0    0
        //  1    1    1
        //  2    2    2
        // O 승리
        if(this.GameMap1[0].value == "O" && this.GameMap2[0].value == "O" && this.GameMap3[0].value == "O"){
            this.GameState = 1;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap2[0].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[0].value == "O" && this.GameMap1[1].value == "O" && this.GameMap1[2].value == "O"){
            this.GameState = 1;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap1[1].isHighlighted = true;
            this.GameMap1[2].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[2].value == "O" && this.GameMap2[1].value == "O" && this.GameMap3[0].value == "O"){
            this.GameState = 1;
            this.GameMap1[2].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap2[0].value == "O" && this.GameMap2[1].value == "O" && this.GameMap2[2].value == "O"){
            this.GameState = 1;
            this.GameMap2[2].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap2[0].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap3[2].value == "O" && this.GameMap3[1].value == "O" && this.GameMap3[0].value == "O"){
            this.GameState = 1;
            this.GameMap3[2].isHighlighted = true;
            this.GameMap3[1].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap3[2].value == "O" && this.GameMap2[1].value == "O" && this.GameMap1[0].value == "O"){
            this.GameState = 1;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[2].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[1].value == "O" && this.GameMap2[1].value == "O" && this.GameMap3[1].value == "O"){
            this.GameState = 1;
            this.GameMap1[1].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[1].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[2].value == "O" && this.GameMap2[2].value == "O" && this.GameMap3[2].value == "O"){
            this.GameState = 1;
            this.GameMap1[2].isHighlighted = true;
            this.GameMap2[2].isHighlighted = true;
            this.GameMap3[2].isHighlighted = true;
            this.player1.winCount++;
            this.player2.lostCount++;
            this.GameOver = false;
        }
        // X 승리
        else if(this.GameMap1[0].value == "X" && this.GameMap2[0].value == "X" && this.GameMap3[0].value == "X"){
            this.GameState = 2;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap2[0].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[0].value == "X" && this.GameMap1[1].value == "X" && this.GameMap1[2].value == "X"){
            this.GameState = 2;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap1[1].isHighlighted = true;
            this.GameMap1[2].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[2].value == "X" && this.GameMap2[1].value == "X" && this.GameMap3[0].value == "X"){
            this.GameState = 2;
            this.GameMap1[2].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap2[0].value == "X" && this.GameMap2[1].value == "X" && this.GameMap2[2].value == "X"){
            this.GameState = 2;
            this.GameMap2[2].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap2[0].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap3[2].value == "X" && this.GameMap3[1].value == "X" && this.GameMap3[0].value == "X"){
            this.GameState = 2;
            this.GameMap3[2].isHighlighted = true;
            this.GameMap3[1].isHighlighted = true;
            this.GameMap3[0].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap3[2].value == "X" && this.GameMap2[1].value == "X" && this.GameMap1[0].value == "X"){
            this.GameState = 2;
            this.GameMap1[0].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[2].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[1].value == "X" && this.GameMap2[1].value == "X" && this.GameMap3[1].value == "X"){
            this.GameState = 2;
            this.GameMap1[1].isHighlighted = true;
            this.GameMap2[1].isHighlighted = true;
            this.GameMap3[1].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        } else  if(this.GameMap1[2].value == "X" && this.GameMap2[2].value == "X" && this.GameMap3[2].value == "X"){
            this.GameState = 2;
            this.GameMap1[2].isHighlighted = true;
            this.GameMap2[2].isHighlighted = true;
            this.GameMap3[2].isHighlighted = true;
            this.player2.winCount++;
            this.player1.lostCount++;
            this.GameOver = false;
        }
        
        
        
        // 무승부인데 9번째에서 승부가 나면 무승부랑 승리랑 같이 올라가니까 이걸 막아주는 코드 꼭 아래다가 적어야함 위에서 승부가 났는지 확인하고 다시 확인하는 것 이기 때문에
        // if(this.count === 9){
        //     if(this.GameOver == false){
        //         return;
        //     }else {
        //         this.GameOver = false;
        //         this.GameState = 0;
        //         this.player1.drawCount++;
        //         this.player2.drawCount++;
        //     }
            
        // }

        
        // console.log(gm.Map[0] ,gm.Map[1] ,gm.Map[2]);
        // console.log(gm.Map[3] ,gm.Map[4] ,gm.Map[5]);
        // console.log(gm.Map[6] ,gm.Map[7] ,gm.Map[8]);

        
        

    }
   
}

GameManager.O = 'O';
GameManager.X = 'X';

// this.Map = new Array(9);
//         for(var i = 0; i < this.Map.length; i++){
//             var stageName = "Game" + i;
//             Map[i] = document.getElementById(stageName);
//         }
// function mouseClick(MapNum) {
//     console.log("클릭" + MapNum);
// }

// Map[0].onclick = function(){mouseClick(0)};
// Map[1].onclick = function(){mouseClick(1)};
// Map[2].onclick = function(){mouseClick(2)};
// Map[3].onclick = function(){mouseClick(3)};
// Map[4].onclick = function(){mouseClick(4)};
// Map[5].onclick = function(){mouseClick(5)};
// Map[6].onclick = function(){mouseClick(6)};
// Map[7].onclick = function(){mouseClick(7)};
// Map[8].onclick = function(){mouseClick(8)};
