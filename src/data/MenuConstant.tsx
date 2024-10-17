interface MenuItem {
  userId: string | null;
  mid: string | null;
  mdesc: string | null;
  mpath: string | null;
  mnm: string | null;
  misUse: string | null;
  mlevel: string | null;
  mtp: string | null;
  mpid: string | null;
  morder: string | null;
}

export const Menu: MenuItem[] = [
  {
    userId: null,
    mid: "ASM-D10000",
    mdesc: null,
    mpath: "/",
    mnm: "가정관리",
    misUse: "Y",
    mlevel: "1",
    mtp: "D",
    mpid: null,
    morder: "2",
  },
  {
    userId: null,
    mid: "ASM-D11000",
    mdesc: null,
    mpath: "/",
    mnm: "기초데이터관리",
    misUse: "Y",
    mlevel: "2",
    mtp: "D",
    mpid: "ASM-D10000",
    morder: "1",
  },
  {
    userId: null,
    mid: "ASM-M11100",
    mdesc: null,
    mpath: "/",
    mnm: "가정관리MASTER",
    misUse: "Y",
    mlevel: "3",
    mtp: "M",
    mpid: "ASM-D11000",
    morder: "1",
  },
  {
    userId: null,
    mid: "ASM-M11200",
    mdesc: null,
    mpath: "/",
    mnm: "기초데이터모니터링",
    misUse: "Y",
    mlevel: "3",
    mtp: "M",
    mpid: "ASM-D11000",
    morder: "27",
  },
  {
    userId: null,
    mid: "ASM-D12000",
    mdesc: null,
    mpath: "/",
    mnm: "기준정보관리",
    misUse: "Y",
    mlevel: "2",
    mtp: "D",
    mpid: "ASM-D10000",
    morder: "2",
  },
  {
    userId: null,
    mid: "CLS-D10000",
    mdesc: null,
    mpath: "/",
    mnm: "부채결산",
    misUse: "Y",
    mlevel: "1",
    mtp: "D",
    mpid: null,
    morder: "3",
  },
  {
    userId: null,
    mid: "CLS-D11000",
    mdesc: null,
    mpath: "/",
    mnm: "기준정보관리",
    misUse: "Y",
    mlevel: "2",
    mtp: "D",
    mpid: "CLS-D10000",
    morder: "1",
  },
  {
    userId: null,
    mid: "ASM-M12100",
    mdesc: null,
    mpath: "/",
    mnm: "기준정보업로드",
    misUse: "Y",
    mlevel: "3",
    mtp: "M",
    mpid: "ASM-D12000",
    morder: "1",
  },
  {
    userId: null,
    mid: "CLS-M11100",
    mdesc: null,
    mpath: "/",
    mnm: "LOA코드매핑관리",
    misUse: "Y",
    mlevel: "3",
    mtp: "M",
    mpid: "CLS-D11000",
    morder: "1",
  },
];
