document.getElementById("addButton").addEventListener("click", addTodo);
document.getElementById("close").addEventListener("click", close);
document.getElementById("closeCh").addEventListener("click", closeCh);
document.getElementById("cancelButton").addEventListener("click", close);
document.getElementById("cancelButtonCh").addEventListener("click", closeCh);
document.getElementById("confirmButton").addEventListener("click", confirm);
document.getElementById("changeButton").addEventListener("click", changeable);
document.getElementById("deleteButton").addEventListener("click", deleteTodo);
document.getElementById("sort").addEventListener("change", sort);

var cnt=0;

function addTodo() {
  document.getElementById("background").setAttribute("style","display:flex;");
}
function close(){
  document.getElementById("background").setAttribute("style","display:none;");
  document.getElementById("rankForm").reset();
  document.getElementById("dayForm").reset();
  document.getElementById("timeForm").reset();
}
function closeCh(){
  document.getElementById("backgroundCh").setAttribute("style","display:none;");
  document.getElementById("rankFormCh").reset();
  document.getElementById("dayFormCh").reset();
  document.getElementById("timeFormCh").reset();
}

function sort(){//모든 요일 기준에 따라 정렬
  const sortName = document.getElementById("sort").value;
  const sun = document.getElementById("0");
  const mon = document.getElementById("1");
  const tue = document.getElementById("2");
  const wen = document.getElementById("3");
  const tur = document.getElementById("4");
  const fri = document.getElementById("5");
  const sat = document.getElementById("6");
  switch(sortName){
    case "priorSort":
      priorSort(sun);
      priorSort(mon);
      priorSort(tue);
      priorSort(wen);
      priorSort(tur);
      priorSort(fri);
      priorSort(sat);
      break;
    case "nameSort":
      nameSort(sun);
      nameSort(mon);
      nameSort(tue);
      nameSort(wen);
      nameSort(tur);
      nameSort(fri);
      nameSort(sat);
      break;
    case "timeSort":
      timeSort(sun);
      timeSort(mon);
      timeSort(tue);
      timeSort(wen);
      timeSort(tur);
      timeSort(fri);
      timeSort(sat);
      break;
  }
}


function priorSort(td){//td의 ul들을 중요도에 따라 정렬
  var i, b,shouldSwitch,switching, ulA, ulB;
  switching = true;
  shouldSwitch = false;
  while (switching) {
    switching = false;
    b= td.getElementsByTagName("UL");
    for (i = 0; i < (b.length-1); i++) {
      shouldSwitch = false;
      switch(b[i].style.backgroundColor){
        case "red":
          ulA=1;
          break;
        case "yellow":
          ulA=2;
          break;
        case "green":
          ulA=3;
          break;
      }
      switch(b[i+1].style.backgroundColor){
        case "red":
          ulB=1;
          break;
        case "yellow":
          ulB=2;
          break;
        case "green":
          ulB=3;
          break;
      }
      if (ulA>ulB) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function nameSort(td){//td의 ul들을 이름에 따라 정렬
  var i, b,liA,liB, shouldSwitch,switching, nameA, nameB;
  switching = true;

  while (switching) {
    switching = false;
    b= td.getElementsByTagName("UL");
    for (i = 0; i < (b.length-1); i++) {
      shouldSwitch = false;
      liA = b[i].getElementsByTagName("LI");
      liB = b[i+1].getElementsByTagName("LI");
      nameA = liA[0].firstChild.nodeValue;
      nameB = liB[0].firstChild.nodeValue;
      if (nameA>nameB) {
        shouldSwitch = true;
        break;
      }
    }
    if(shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function timeSort(td){//td의 ul들을 시간에 따라 정렬
  var i, b, liA, liB,shouldSwitch,switching, timeA, timeB;
  switching = true;

  while (switching){
    switching = false;
    b= td.getElementsByTagName("UL");
    for (i = 0; i < (b.length-1); i++){
      shouldSwitch = false;
      liA = b[i].getElementsByTagName("LI");
      liB = b[i+1].getElementsByTagName("LI");
      timeA = liA[1].firstChild.nodeValue;
      timeA = timeA.substr(5,5);
      timeB = liB[1].firstChild.nodeValue;
      timeB = timeB.substr(5,5);
      if(timeA>timeB) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function changeOpen(event){//todo를 클릭하면 해당 ul의 정보를 가져와 수정, 삭제 위한 창열기
  const target = event.target;
  const tagName = target.nodeName;
  if(tagName=="LI"){
    var targetUL = target.parentNode;
  }else if(tagName=="UL"){
    var targetUL = target;
  }
  const firstLi = targetUL.firstChild;
  const lastLi = targetUL.lastChild;

  document.getElementById("todoCh").value = firstLi.firstChild.nodeValue;
  
  const color = targetUL.style.backgroundColor;
  switch(color){
    case "red":
      document.getElementById("rankCh").value="1";
      break;
    case "yellow":
      document.getElementById("rankCh").value="2";
      break;
    case "green":
      document.getElementById("rankCh").value="3";
      break;
  }

  const className = targetUL.className;//선택한 ul의 class 이름

  const ulClass = document.getElementsByClassName(className);//class 이름으로 모든 ul 저장
  var day=[];
  const num = ulClass.length;
  for(let i=0;i<num;i++){//어느 요일에 저장되어 있는지 가져오기
    day[i]=Number(ulClass[i].parentNode.getAttribute('id'));
  }
  const min = Math.min(...day);//시작 요일

  document.getElementById("day1Ch").value = min.toString();
  const end = min+num-1;
  document.getElementById("day2Ch").value = end.toString();

  const time = lastLi.firstChild.nodeValue;
  document.getElementById("time1Ch").value = time.substr(5,5);
  document.getElementById("time2Ch").value = time.substr(11,5);

  document.getElementById("backgroundCh").setAttribute("style","display:flex;");

  document.getElementById("todoCh").disabled = true;
  document.getElementById("rankCh").disabled = true;
  document.getElementById("day1Ch").disabled = true;
  document.getElementById("day2Ch").disabled = true;
  document.getElementById("time1Ch").disabled = true;
  document.getElementById("time2Ch").disabled = true;

  const btSet = document.getElementById("btSetCh");
  const p = document.createElement("p");
  const nameNode = document.createTextNode(className);
  p.appendChild(nameNode);
  btSet.appendChild(p);
  p.setAttribute("style","display:none;");

}

function changeable(event){//수정 또는 수정완료 버튼 클릭했을 때
  const button = event.target;
  if(button.firstChild.nodeValue==="수정"){
    document.getElementById("todoCh").disabled = false;
    document.getElementById("rankCh").disabled = false;
    document.getElementById("day1Ch").disabled = false;
    document.getElementById("day2Ch").disabled = false;
    document.getElementById("time1Ch").disabled = false;
    document.getElementById("time2Ch").disabled = false;
    button.firstChild.nodeValue = "수정완료";

  }else if(button.firstChild.nodeValue==="수정완료"){
    const btSet = button.parentNode;
    const className = btSet.lastChild.firstChild.nodeValue;
    const ulClass = document.getElementsByClassName(className);
    while(ulClass.length > 0){
      ulClass[0].parentNode.removeChild(ulClass[0]);
    }
    confirmCh();
    sort();
    closeCh();
    button.firstChild.nodeValue = "수정";
  }
}

function deleteTodo(event){//삭제 버튼 클릭하면 해당 일정이 삭제됨
  const button = event.target;
  const btSet = button.parentNode;
  const className = btSet.lastChild.firstChild.nodeValue;
  const ulClass = document.getElementsByClassName(className);
  while(ulClass.length > 0){
      ulClass[0].parentNode.removeChild(ulClass[0]);
  }
  closeCh();
}

function confirm(){//등록 버튼 누르면 입력값 읽어와 일정 추가
  const todo = document.getElementById("todo").value;
  const rank = document.getElementById("rank").value;
  const day1 = document.getElementById("day1").value;
  const day2 = document.getElementById("day2").value;

  if(!todo){
    alert("일정을 입력해 주세요");
    close();
  }
  else{
    if(day1>day2){
      alert("요일 범위를 올바르게 입력해주세요.");
      close();
    }
    else{
      const time1 = document.getElementById("time1").value;
      const time2 = document.getElementById("time2").value;
      if(time1>time2){
        alert("시간 범위를 올바르게 입력해 주세요");
        close();
      }
      else{
        cnt+=1;

        if(day2===day1){
          const ul = document.createElement("ul");
          const li1 = document.createElement("li");
          const text1 = document.createTextNode(todo);
          const li2 = document.createElement("li");
          const text="시간 : "+time1+"~"+time2;
          const text2 = document.createTextNode(text);
  
          li1.appendChild(text1);
          li2.appendChild(text2);
          ul.appendChild(li1);
          ul.appendChild(li2);
  
          ul.style.textAlign="center";
          ul.style.borderRadius="8px";
          ul.style.paddingTop="15px";
          ul.style.paddingBottom="15px";
          if(rank==="1"){
            ul.style.border="2px solid red";
            ul.style.backgroundColor="red";
          }else if(rank==="2"){
            ul.style.border="2px solid yellow";
            ul.style.backgroundColor="yellow";
          }else{
            ul.style.border="2px solid green";
            ul.style.backgroundColor="green";
          }
          ul.setAttribute("class","ul"+cnt);
          document.getElementById(day1).appendChild(ul);
          sort();
          ul.addEventListener("click", changeOpen);
          close();
        }else{
          const start=Number(day1);
          const end = Number(day2);
          for(let i=start;i<end+1;i++){
            const ul = document.createElement("ul");
            const li1 = document.createElement("li");
            const text1 = document.createTextNode(todo);
            const li2 = document.createElement("li");
            const text="시간 : "+time1+"~"+time2;
            const text2 = document.createTextNode(text);

            li1.appendChild(text1);
            li2.appendChild(text2);
            ul.appendChild(li1);
            ul.appendChild(li2);

            ul.style.textAlign="center";
            ul.style.borderRadius="8px";
            ul.style.paddingTop="15px";
            ul.style.paddingBottom="15px";
            if(rank==="1"){
              ul.style.border="2px solid red";
              ul.style.backgroundColor="red";
            }else if(rank==="2"){
              ul.style.border="2px solid yellow";
              ul.style.backgroundColor="yellow";
            }else{
              ul.style.border="2px solid green";
              ul.style.backgroundColor="green";
            }
            ul.setAttribute("class","ul"+cnt);
            document.getElementById(i.toString()).appendChild(ul);
            sort();
            ul.addEventListener("click", changeOpen);
          }
          close();
        }
      }
    }
  }
}

function confirmCh(){//수정완료 버튼 누르면 수정된 값 읽어와 일정 등록
  const todo = document.getElementById("todoCh").value;
  const rank = document.getElementById("rankCh").value;
  const day1 = document.getElementById("day1Ch").value;
  const day2 = document.getElementById("day2Ch").value;

  if(!todo){
    alert("일정을 입력해 주세요");
    closeCh();
  }
  else{
    if(day1>day2){
      alert("요일 범위를 올바르게 입력해주세요.");
      closeCh();
    }
    else{
      const time1 = document.getElementById("time1Ch").value;
      const time2 = document.getElementById("time2Ch").value;
      if(time1>time2){
        alert("시간 범위를 올바르게 입력해 주세요");
        closeCh();
      }
      else{
        cnt+=1;
        if(day2===day1){
          const ul = document.createElement("ul");
          const li1 = document.createElement("li");
          const text1 = document.createTextNode(todo);
          const li2 = document.createElement("li");
          const text="시간 : "+time1+"~"+time2;
          const text2 = document.createTextNode(text);
  
          li1.appendChild(text1);
          li2.appendChild(text2);
          ul.appendChild(li1);
          ul.appendChild(li2);
  
          ul.style.textAlign="center";
          ul.style.borderRadius="8px";
          ul.style.paddingTop="15px";
          ul.style.paddingBottom="15px";
          if(rank==="1"){
            ul.style.border="2px solid red";
            ul.style.backgroundColor="red";
          }else if(rank==="2"){
            ul.style.border="2px solid yellow";
            ul.style.backgroundColor="yellow";
          }else{
            ul.style.border="2px solid green";
            ul.style.backgroundColor="green";
          }
          ul.setAttribute("class","ul"+cnt);
          document.getElementById(day1).appendChild(ul);
          sort();
          ul.addEventListener("click", changeOpen);
          closeCh();
        }else{
          const start=Number(day1);
          const end = Number(day2);
          for(let i=start;i<end+1;i++){
            const ul = document.createElement("ul");
            const li1 = document.createElement("li");
            const text1 = document.createTextNode(todo);
            const li2 = document.createElement("li");
            const text="시간 : "+time1+"~"+time2;
            const text2 = document.createTextNode(text);

            li1.appendChild(text1);
            li2.appendChild(text2);
            ul.appendChild(li1);
            ul.appendChild(li2);

            ul.style.textAlign="center";
            ul.style.borderRadius="8px";
            ul.style.paddingTop="15px";
            ul.style.paddingBottom="15px";
            if(rank==="1"){
              ul.style.border="2px solid red";
              ul.style.backgroundColor="red";
            }else if(rank==="2"){
              ul.style.border="2px solid yellow";
              ul.style.backgroundColor="yellow";
            }else{
              ul.style.border="2px solid green";
              ul.style.backgroundColor="green";
            }
            ul.setAttribute("class","ul"+cnt);
            document.getElementById(i.toString()).appendChild(ul);
            sort();
            ul.addEventListener("click", changeOpen);
          }
          closeCh();
        }
      }
    }
  }
}
