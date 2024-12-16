### 컴파일:

```bash
pnpm run build
```

### 실행:
```bash
pnpm run start
```

### 결과:
> JSON → 클래스 인스턴스
```js
const memberInfoInstance = plainToClass(MemberInfoDto, apiResponse);

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
```
```yaml
--- JSON → 클래스 인스턴스 ---
instance instanceof MemberInfoDto: true
memberInfo: 홍길동
address instanceof AddressDto: true
street: 서울시 강남구
city: 서울
items: [
  ItemDto { itemName: 'Laptop', quantity: 1 },
  ItemDto { itemName: 'Mouse', quantity: 2 }
]
items[0] instanceof ItemDto: true
items[0].itemName: Laptop
items[0].quantity: 1
items[1].itemName: Mouse
items[1].quantity: 2
```

<br/>

> 클래스 인스턴스 → JSON
```js
memberInfoInstance.memberInfo = '김철수';
memberInfoInstance.address.street = '부산시 해운대구';
memberInfoInstance.address.city = '부산';
memberInfoInstance.items.push(new ItemDto('Keyboard', 1));

const requestPayload = classToPlain(memberInfoInstance);

console.log(JSON.stringify(requestPayload, null, 2));
```
```yaml
--- 클래스 인스턴스 → JSON ---
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
```
