// wxO 임베디드 챗 설정. enabled를 true로 바꾸고 아래 값을 채우면 홈 화면에 실제 에이전트가 붙는다.
// 값 확인: orchestrate channels webchat embed --agent-name=findemo_supervisor_agent
// 주의: 임베디드 챗은 보안 설정(JWT 서명용 서버, 공개키 등록)이 끝나야 초기화된다. 서버 코드는 이 사이트에 포함하지 않았다.
window.CHAT_CONFIG = {
  enabled: false,
  orchestrationID: "",          // 예: <orgID>_<orchestrationID>
  hostURL: "",                  // 예: https://dl.watson-orchestrate.ibm.com 또는 리전별 호스트
  crn: "",                      // IBM Cloud 인스턴스 CRN
  agentId: "916c803a-c136-4fb4-9161-bd5ae4302c8a",   // findemo_supervisor_agent
  agentEnvironmentId: "",       // draft 또는 live 환경 ID
  deploymentPlatform: "ibmcloud"
};
