let go = document.getElementById('go');
let main = document.getElementById('main');
let color = ['pink', 'olive', 'yellow', 'blue'];
var speed = 5;
let num = 0;
let flag = true;
var timer;

function cDiv() {
    let oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.setAttribute('class', 'row');

    for (let i = 0; i < 4; i++) {
        let iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }

    let clickDiv = oDiv.childNodes[index];
    clickDiv.setAttribute('class', 'target');
    clickDiv.style.backgroundColor = color[index];
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }

}


function slide() {
    clearInterval(timer);
    timer = setInterval(function(){
        let location = parseInt(main.offsetTop) + speed;
        main.style.top = location + 'px';
        if (parseInt(main.offsetTop) >= 0) {
            cDiv();
            main.style.top = '-150px';
        }
        let len = main.childNodes.length;
        if (len == 6) {
            for (let i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].children[i].classList.contains('target')) {
                    alert('Game Over!score:' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20);
}


function clickEvent() {
    go.addEventListener('click', function () {
        go.style.display = 'none';
        slide();
    })
    main.addEventListener('click', function (e) {
        if (flag) {
            let tar = e.target;
            if (tar.className == 'target') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('target');
                num++;
            } else {
                alert('Game Over!score:' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed ++;
            }
        }
    });
}
clickEvent();