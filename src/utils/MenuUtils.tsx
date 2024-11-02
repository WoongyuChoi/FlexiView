import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { CustomTreeViewBaseItem, Menu } from "../data/MenuConstant";

export const convertToTreeItems = (): TreeViewBaseItem[] => {
  const menuMap = new Map<string, TreeViewBaseItem>();

  // Menu의 각 항목을 TreeItem 형태로 변환하여 itemMap에 추가
  Menu.forEach((menuItem) => {
    const treeItem: TreeViewBaseItem = {
      id: menuItem.mid || "",
      label: menuItem.mnm || "",
      children: [],
    };
    menuMap.set(treeItem.id, treeItem);
  });

  // menuMap에서 mpid를 이용해 부모-자식 관계 설정
  Menu.forEach((menuItem) => {
    if (menuItem.mpid) {
      const parentItem = menuMap.get(menuItem.mpid);
      const childItem = menuMap.get(menuItem.mid || "");
      if (parentItem && childItem) {
        parentItem.children = parentItem.children || [];
        parentItem.children.push(childItem);
      }
    }
  });

  // 최상위 레벨(mpid가 null인) 항목만 반환
  return Array.from(menuMap.values()).filter((item) => {
    const menuItem = Menu.find((m) => m.mid === item.id);
    return menuItem?.mpid === null;
  });
};

export const getMenuItemByMid = (mid: string | null) => {
  if (!mid) return null;
  // mid 값을 받아서 Menu 항목 중 해당 mid에 해당하는 항목을 반환하는 함수
  return Menu.find((menuItem) => menuItem?.mid === mid) || null;
};

export const convertMenuToTreeItems = (
  menuData: typeof Menu
): CustomTreeViewBaseItem[] => {
  // 부모 ID가 null인 루트 항목들을 morder 기준으로 정렬한 후 찾음
  const rootItems = menuData
    .filter((item) => !item?.mpid) // 부모가 없는 루트 항목 찾기
    .sort((a, b) =>
      a?.morder && b?.morder ? parseInt(a?.morder) - parseInt(b?.morder) : 0
    ) // morder 기준으로 정렬
    .map((item) => ({
      id: item?.mid || "",
      label: item?.mnm || "",
      fileType: "FolderSpecialTwoTone",
      children: item?.mid ? getChildren(item?.mid, menuData) : [], // 자식 항목들을 찾음, null 체크
    }));

  return rootItems;
};

// 부모 ID와 일치하는 자식 항목들을 morder 기준으로 정렬하여 트리 구조로 변환
const getChildren = (
  parentId: string,
  menuData: typeof Menu
): CustomTreeViewBaseItem[] => {
  const children = menuData
    .filter((item) => item?.mpid === parentId)
    .sort((a, b) =>
      a?.morder && b?.morder ? parseInt(a?.morder) - parseInt(b?.morder) : 0
    ) // morder 기준으로 정렬
    .map((item) => ({
      id: item?.mid || "",
      label: item?.mnm || "",
      children: item?.mid ? getChildren(item?.mid, menuData) : [], // 재귀적으로 자식 항목들 찾기, null 체크
    }));

  return children?.length ? children : []; // 자식이 없으면 빈 배열 반환
};
