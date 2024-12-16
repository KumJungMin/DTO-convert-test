// index.ts
import { MemberInfoDto } from './DTO/MemberInfoDto';
import { plainToClass, classToPlain } from './helper/transformer';
import { memberInfoMapping } from './helper/mappings';

function main() {
  // === API 응답(JSON) ===
  const apiResponse = {
    MBR_INFO: '홍길동'
  };

  // JSON → 클래스 인스턴스
  const memberInfoInstance = plainToClass(MemberInfoDto, apiResponse, memberInfoMapping);
  console.log(memberInfoInstance instanceof MemberInfoDto);
  console.log(memberInfoInstance.memberInfo);

  // === 클래스 인스턴스 → API 요청(JSON) ===
  memberInfoInstance.memberInfo = '김철수';
  const requestPayload = classToPlain(memberInfoInstance, memberInfoMapping);
  console.log(requestPayload);
  // { MBR_INFO: '김철수' }
}

main();