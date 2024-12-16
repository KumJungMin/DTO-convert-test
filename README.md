### 컴파일:

```bash
pnpm run build
```

### 실행:
```bash
pnpm run start
```

```yaml
--- JSON → 클래스 인스턴스 ---
instance instanceof MemberInfoDto: true
memberInfo: 홍길동
address instanceof AddressDto: true
street: 서울시 강남구
city: 서울

--- 클래스 인스턴스 → JSON ---
{
  MBR_INFO: '김철수',
  ADDRESS: { STREET: '부산시 해운대구', CITY: '부산' }
}
```
