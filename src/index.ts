import 'reflect-metadata'; // Reflect Metadata 활성화
import { MemberInfoDto } from './dtos/MemberInfoDto';
import { AddressDto } from './dtos/AddressDto';
import { ItemDto } from './dtos/ItemDto';
import { plainToClassDynamic, classToPlainDynamic } from './transformer';

function main() {
  // === API 응답(JSON) ===
  const apiResponse = {
    MBR_INFO: '홍길동',
    ADDRESS: {
      STREET: '서울시 강남구',
      CITY: '서울',
    },
    ITEMS: [
      { ITEM_NAME: 'Laptop', QUANTITY: 1 },
      { ITEM_NAME: 'Mouse', QUANTITY: 2 },
    ],
  };

  // JSON → 클래스 인스턴스
  const memberInfoInstance = plainToClassDynamic(MemberInfoDto, apiResponse);

  console.log('--- JSON → 클래스 인스턴스 ---');
  console.log('instance instanceof MemberInfoDto:', memberInfoInstance instanceof MemberInfoDto); // true
  console.log('memberInfo:', memberInfoInstance.memberInfo); // '홍길동'
  console.log('address instanceof AddressDto:', memberInfoInstance.address instanceof AddressDto); // true
  console.log('street:', memberInfoInstance.address.street); // '서울시 강남구'
  console.log('city:', memberInfoInstance.address.city); // '서울'
  console.log('items:', memberInfoInstance.items); // [ItemDto, ItemDto]
  console.log('items[0] instanceof ItemDto:', memberInfoInstance.items[0] instanceof ItemDto); // true
  console.log('items[0].itemName:', memberInfoInstance.items[0].itemName); // 'Laptop'
  console.log('items[0].quantity:', memberInfoInstance.items[0].quantity); // 1
  console.log('items[1].itemName:', memberInfoInstance.items[1].itemName); // 'Mouse'
  console.log('items[1].quantity:', memberInfoInstance.items[1].quantity); // 2

  // === 클래스 인스턴스 → API 요청(JSON) ===
  memberInfoInstance.memberInfo = '김철수';
  memberInfoInstance.address.street = '부산시 해운대구';
  memberInfoInstance.address.city = '부산';
  memberInfoInstance.items.push(new ItemDto('Keyboard', 1));

  const requestPayload = classToPlainDynamic(memberInfoInstance);
  console.log('\n--- 클래스 인스턴스 → JSON ---');
  console.log(JSON.stringify(requestPayload, null, 2));
  /*
  {
    "MBR_INFO": "김철수",
    "ADDRESS": {
      "STREET": "부산시 해운대구",
      "CITY": "부산"
    },
    "ITEMS": [
      {
        "ITEM_NAME": "Laptop",
        "QUANTITY": 1
      },
      {
        "ITEM_NAME": "Mouse",
        "QUANTITY": 2
      },
      {
        "ITEM_NAME": "Keyboard",
        "QUANTITY": 1
      }
    ]
  }
  */
}

main();