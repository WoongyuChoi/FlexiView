import { Box, Paper } from "@mui/material";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import { useState } from "react";
import { Menu, MenuItem } from "../data/MenuConstant";
import TextFieldLayout from "./TextFieldLayout";
import TreeViewLayout from "./TreeViewLayout";

const MainLayout = () => {
  // TreeView API를 참조할 수 있는 ref 생성
  const apiRef = useTreeViewApiRef();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>(Menu);

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    itemId: string | null
  ) => {
    setSelectedItem(itemId);
  };

  const handleApplyChanges = (updatedItem: MenuItem) => {
    const updatedMenu = menuData.map((item: MenuItem) =>
      item.mid === updatedItem.mid ? updatedItem : item
    );
    // 업데이트된 데이터를 상태에 반영
    setMenuData(updatedMenu);
  };

  return (
    <Box
      sx={{
        width: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        backgroundColor: "#f0f2f5",
        borderRadius: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          width: "90%",
          height: "95%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <TreeViewLayout
          apiRef={apiRef}
          onSelectedItemsChange={handleSelectedItemsChange}
          menuData={menuData}
        />

        <TextFieldLayout
          selectedItem={selectedItem}
          onApplyChanges={handleApplyChanges}
        />
      </Paper>
    </Box>
  );
};

export default MainLayout;
