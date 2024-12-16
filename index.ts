import { MemberInfoDto } from './DTO/MemberInfoDto';
import { AddressDto } from './DTO/AddressDto';
import { plainToClass, classToPlain } from './helper/transformer';
import { memberInfoMappings, addressMappings } from './helper/mappings';

function main() {
  // === API 응답(JSON) ===
  const apiResponse = {
    MBR_INFO: '홍길동',
    ADDRESS: {
      STREET: '서울시 강남구',
      CITY: '서울',
    },
  };

  // JSON → 클래스 인스턴스
  const memberInfoInstance = plainToClass(
    MemberInfoDto,
    apiResponse,
    memberInfoMappings,
    {
      address: addressMappings, // 중첩 객체 매핑
    }
  );

  console.log('--- JSON → 클래스 인스턴스 ---');
  console.log('instance instanceof MemberInfoDto:', memberInfoInstance instanceof MemberInfoDto); // true
  console.log('memberInfo:', memberInfoInstance.memberInfo); // '홍길동'
  console.log('address instanceof AddressDto:', memberInfoInstance.address instanceof AddressDto); // true
  console.log('street:', memberInfoInstance.address.street); // '서울시 강남구'
  console.log('city:', memberInfoInstance.address.city); // '서울'

  // === 클래스 인스턴스 → API 요청(JSON) ===
  memberInfoInstance.memberInfo = '김철수';
  memberInfoInstance.address.street = '부산시 해운대구';
  memberInfoInstance.address.city = '부산';

  const requestPayload = classToPlain(
    memberInfoInstance,
    memberInfoMappings,
    {
      address: addressMappings, // 중첩 객체 매핑
    }
  );

  console.log('\n--- 클래스 인스턴스 → JSON ---');
  console.log(requestPayload);
  /*
  {
    MBR_INFO: '김철수',
    ADDRESS: {
      STREET: '부산시 해운대구',
      CITY: '부산',
    }
  }
  */
}

main();