const dangerQuestionCount = [
    { count: 100, acceptRate: 50, deadlineRate: 70 },
    { count: 500, acceptRate: 60, deadlineRate: 80 },
    { count: 1000, acceptRate: 40, deadlineRate: 60 },
    { count: 3000, acceptRate: 30, deadlineRate: 40 },
    { count: 10000, acceptRate: 70, deadlineRate: 75 }
  ];
  
const suspiciousQuestionCount = [
    { count: 2, acceptRate: 50, deadlineRate: 50 },
    { count: 10, acceptRate: 30, deadlineRate: 30 },
    { count: 30, acceptRate: 40, deadlineRate: 40 },
    { count: 50, acceptRate: 50, deadlineRate: 50 },
    { count: 70, acceptRate: 60, deadlineRate: 60 },
    { count: 100, acceptRate: 70, deadlineRate: 70 },
    { count: 200, acceptRate: 70, deadlineRate: 80 },
    { count: 500, acceptRate: 80, deadlineRate: 85 },
    { count: 1000, acceptRate: 80, deadlineRate: 88 },
    { count: 2000, acceptRate: 80, deadlineRate: 90 }
];
  
const safeQuestionCount = [
    { count: 10, acceptRate: 90, deadlineRate: 90 },
    { count: 100, acceptRate: 80, deadlineRate: 80 },
    { count: 1000, acceptRate: 80, deadlineRate: 85 },
    { count: 10000, acceptRate: 90, deadlineRate: 95 }
];

const GetStatus = (questionCounts, acceptRate, deadlineRate, nickname) => {
    const danger = dangerQuestionCount.some(qc => 
        (questionCounts <= qc.count) && ((acceptRate <= qc.acceptRate) || (deadlineRate <= qc.deadlineRate) || (deadlineRate - acceptRate >= qc.deadlineRate - qc.acceptRate))
    );

    const suspicious = suspiciousQuestionCount.some(qc => 
        (questionCounts <= qc.count) && ((acceptRate <= qc.acceptRate) || (deadlineRate <= qc.deadlineRate) || (deadlineRate - acceptRate >= qc.deadlineRate - qc.acceptRate))
    );

    const safe = safeQuestionCount.some(qc => 
        (questionCounts <= qc.count) && (acceptRate >= qc.acceptRate) && (deadlineRate - acceptRate <= qc.deadlineRate - qc.acceptRate)
    );

    let status = "";
    if (safe){
        status = "Safe";
    }
    else if(suspicious){
        status = "Suspicious";
    }
    else if(danger){
        status = "Danger";
    }
    else{
        status = "Unknown";
    }
    return status;
}

const GetCondition = () => {
    const result = document.querySelector(".c-userinfo").textContent.replace(/\s/g, "");
    const questionRegex = /질문수(\d+)/;
    const acceptRateRegex = /채택률([\d.]+)/;
    const deadlineRegex = /마감률([\d.]+)/;
    const nicknameRegex = /닉네임(.+)(끌올)?작성일/;

    let questionCount = questionRegex.exec(result)[1];
    console.log(`질문수: ${questionCount}`);
    let acceptRate = acceptRateRegex.exec(result)[1];
    console.log(`채택률: ${acceptRate}`);
    let deadlineRate = deadlineRegex.exec(result)[1];
    console.log(`마감률: ${deadlineRate}`);
    let nickname = nicknameRegex.exec(result)[1].trim();
    console.log(`닉네임: ${nickname}`);

    questionCount = parseInt(questionCount);
    acceptRate = parseFloat(acceptRate);
    deadlineRate = parseFloat(deadlineRate);
    const option_state = GetStatus(questionCount, acceptRate, deadlineRate, nickname);
    const data = {questionCount, acceptRate, deadlineRate, nickname};
    MakePopup(option_state, data);
    return option_state;
};


const MakePopup = (status, data) => {
    const { questionCount, acceptRate, deadlineRate, nickname } = data;
    
    let questionMsg = document.createElement("div");
    let acceptRateMsg = document.createElement("div");
    let deadlineRateMsg = document.createElement("div");

    let popup = document.createElement("div");
    let message = document.createElement("div");
    let sub_message = document.createElement("a");
    let footer = document.createElement("footer");
    let copyright = document.createElement("div");

    popup.style.backgroundColor = "#fff";
    popup.style.boxSizing = "border-box";
    popup.style.border = "5px solid #000";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.style.margin = "30px";
    popup.style.padding = "50px";
    popup.style.display = "block";

    questionMsg.innerHTML = `질문수 ${questionCount}`;
    acceptRateMsg.innerHTML = `채택률 ${acceptRate}%`;
    deadlineRateMsg.innerHTML = `마감률 ${deadlineRate}%`;

    questionMsg.style.fontSize = "20px";
    questionMsg.style.textShadow = "5px 5px 5px #000";
    questionMsg.style.lineHeight = "auto";
    questionMsg.style.color = "#fff";
    questionMsg.style.fontWeight = "bold";

    acceptRateMsg.style.fontSize = "20px";
    acceptRateMsg.style.textShadow = "5px 5px 5px #000";
    acceptRateMsg.style.lineHeight = "auto";
    acceptRateMsg.style.color = "#fff";
    acceptRateMsg.style.fontWeight = "bold";

    deadlineRateMsg.style.fontSize = "20px";
    deadlineRateMsg.style.textShadow = "5px 5px 5px #000";
    deadlineRateMsg.style.lineHeight = "auto";
    deadlineRateMsg.style.color = "#fff";
    deadlineRateMsg.style.fontWeight = "bold";

    message.style.boxSizing = "border-box";
    message.style.fontSize = "40px";
    message.style.color = "#fff";
    message.style.fontWeight = "bold";
    message.style.margin = "10px";
    message.style.width = "100%";
    message.style.wordWrap = "break-word";
    message.style.textShadow = "5px 5px 5px #000";
    message.style.lineHeight = "auto";

    sub_message.style.fontSize = "1em";
    sub_message.style.color = "#2d332c";
    sub_message.href = "https://blog.naver.com/alsrua7222/222988420273";
    sub_message.innerHTML = "자세한 내용 보러가기";
    sub_message.style.textShadow = "5px 5px 5px #3f48cc";
    sub_message.addEventListener("mouseover", function(){
        sub_message.style.color = "#3f48cc";
        sub_message.style.cursor = "pointer";
    });
    sub_message.addEventListener("mouseout", function(){
        sub_message.style.color = "#2d332c";
        sub_message.style.cursor = "default";
    });

    copyright.style.fontSize = "9px";
    copyright.innerHTML = "네이버지식인 필터링 - KMK";
    copyright.style.textShadow = "2px 2px 4px #000";

    
    if (status === "Danger") {
        popup.style.backgroundColor = "#ff4136";
        message.innerHTML = "위험합니다. <p>답변할 경우, 채택 못 받을 가능성이 큽니다.</p>";
    } else if (status === "Suspicious") {
        popup.style.backgroundColor = "#ff851b";
        message.innerHTML = "의심해보세요. <p>답변할 경우, 채택 못 받을 가능성이 약간 있습니다.</p>";
    } else if (status === "Safe") {
        popup.style.backgroundColor = "#2ecc40";
        message.innerHTML = "안전합니다. <p>답변할 경우, 채택 받을 가능성이 높습니다.</p>";
    }
    else{
        popup.style.backgroundColor = "#808080";
        message.innerHTML = "존재하지 않는 데이터입니다. <p>스스로 판단하시길 바랍니다.</p>";
    }
    
    footer.appendChild(copyright);
    popup.appendChild(questionMsg);
    popup.appendChild(acceptRateMsg);
    popup.appendChild(deadlineRateMsg);
    popup.appendChild(message);
    popup.appendChild(sub_message);
    popup.appendChild(footer);
    document.getElementsByClassName("c-heading__title")[0].appendChild(popup);
    // document.getElementsByClassName("c-userinfo__left")[0].addEventListener("mouseover", function(){
    //     popup.style.display = "block";
    // });
    // document.getElementsByClassName("c-userinfo__left")[0].addEventListener("mouseout", function(){
    //     popup.style.display = "none";
    // });

    return;
};

chrome.runtime.sendMessage({
    action: "getUserInfo",
    Context: GetCondition()
});