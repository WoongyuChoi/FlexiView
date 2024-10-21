import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { Menu } from "../data/MenuConstant";

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
