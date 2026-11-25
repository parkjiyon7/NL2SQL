// wxO 임베디드 챗 설정. enabled가 true이고 아래 값이 채워져 있으면 홈 화면에 Supervisor, 에이전트 탭에 에이전트별 챗이 붙는다.
// 이 값들은 임베드 스크립트에 원래 공개되는 식별자이며 API 키가 아니다. API 키는 이 사이트에 두지 않는다.
// 주의: 임베디드 챗은 wxO 보안 설정(JWT 서명 서버, 공개키 등록)을 끝내거나, 보안을 끈 상태여야 초기화된다.
//       정적 사이트(GitHub Pages)에는 서명 서버가 없으므로, 보안을 끄지 않으면 챗이 뜨지 않는다.
window.CHAT_CONFIG = {
  enabled: true,
  orchestrationID: "827385baefa24441ab564efb23f9f2f7_3fe554f6-79ae-4324-94f2-c5c39859fa64",
  hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
  crn: "crn:v1:bluemix:public:watsonx-orchestrate:au-syd:a/827385baefa24441ab564efb23f9f2f7:3fe554f6-79ae-4324-94f2-c5c39859fa64::",
  deploymentPlatform: "ibmcloud",
  agentEnvironmentId: "",   // 비워 두면 임베드 스크립트 기본값을 따른다. 필요하면 draft 또는 live 환경 ID를 넣는다
  agents: {
    sup: { id: "723f553c-3608-4a98-8d4f-2fd755284de0", name: "Supervisor" },
    ctx: { id: "0cd8907e-fe2d-4282-ae08-1e45651d3603", name: "용어·메타데이터 검색" },
    sql: { id: "59600b51-bf62-4b97-8eba-da582f42e492", name: "SQL" },
    ins: { id: "9802bda7-35d9-40e3-a1d5-d1c758a64208", name: "Insight" }
  }
};
