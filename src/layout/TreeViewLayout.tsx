import FolderSpecialTwoToneIcon from "@mui/icons-material/FolderSpecialTwoTone";
import FolderOpenTwoToneIcon from "@mui/icons-material/FolderOpenTwoTone";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
  TreeItem2Checkbox,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import {
  useTreeItem2,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view/useTreeItem2";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { CustomTreeViewBaseItem, Menu, MenuItem } from "../data/MenuConstant";
import { convertMenuToTreeItems, convertToTreeItems } from "../utils/MenuUtils";
interface TreeViewLayoutProps {
  apiRef: any;
  onSelectedItemsChange: (
    event: React.SyntheticEvent,
    itemId: string | null
  ) => void;
  menuData: MenuItem[];
}

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  [`&.Mui-expanded `]: {
    "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
      {
        color: theme.palette.primary.dark,
        ...theme.applyStyles("light", {
          color: theme.palette.primary.main,
        }),
      },
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: "white",
    ...theme.applyStyles("light", {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    // ...theme.applyStyles('light', {
    //   backgroundColor: theme.palette.primary.main,
    // }),
  },
}));

interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
  expandable?: boolean;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: "inherit",
  fontWeight: 500,
}) as typeof Typography;

function CustomLabel({
  icon: Icon,
  expandable,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
    </TreeItem2Label>
  );
}

type FileType =
  | "FolderSpecialTwoTone"
  | "FolderOpenTwoTone"
  | "Article"
  | string
  | undefined;

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case "FolderSpecialTwoTone":
      return FolderSpecialTwoToneIcon;
    case "FolderOpenTwoTone":
      return FolderOpenTwoToneIcon;
    case "Article":
      return ArticleIcon;
    default:
      return ArticleIcon;
  }
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;
  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });
  const item = publicAPI.getItem(itemId);
  const icon = item?.fileType
    ? getIconFromFileType(item?.fileType)
    : Boolean(children)
    ? FolderOpenTwoToneIcon
    : ArticleIcon;

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": status.selected,
              "Mui-focused": status.focused,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <CustomLabel {...getLabelProps({ icon })} />
          <TreeItem2Checkbox {...getCheckboxProps()} />
        </CustomTreeItemContent>
        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

const getItemDescendantsIds = (item: TreeViewBaseItem): string[] => {
  const ids: string[] = [];
  item.children?.forEach((child) => {
    ids.push(child.id);
    ids.push(...getItemDescendantsIds(child));
  });
  return ids;
};

const TreeViewLayout = ({
  apiRef,
  onSelectedItemsChange,
  menuData,
}: TreeViewLayoutProps) => {
  const [lastClickedItem, setLastClickedItem] = useState<string[] | null>([]);
  const [menuTreeItems, setMenuTreeItems] = useState<CustomTreeViewBaseItem[]>(
    []
  );
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggledItemRef = useRef<{ [itemId: string]: boolean }>({});

  useEffect(() => {
    const newTreeItems = convertMenuToTreeItems(menuData);
    setMenuTreeItems(newTreeItems);

    // 모든 항목을 확장 상태로 설정
    const allItemIds = menuData.map((item) => item.mid || "");
    setExpandedItems(allItemIds);
  }, [menuData]);

  const isItemDisabled = (item: TreeViewBaseItem) => {
    const menuItem = menuData.find((menu) => menu.mid === item.id);
    return menuItem?.misUse === "N"; // misUse가 "N"이면 비활성화
  };

  const handleItemClick = (event: React.SyntheticEvent, itemId: string) => {
    onSelectedItemsChange(event, itemId);

    // if (!selectedItems.includes(itemId)) {
    //   handleSelectedItemsChange(event, [...selectedItems, itemId]);
    // } else {
    //   handleSelectedItemsChange(
    //     event,
    //     selectedItems.filter((id) => id !== itemId)
    //   );
    // }
  };

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    newSelectedItems: string[]
  ) => {
    // 부모 항목 선택 시 자식 항목 선택/해제
    const itemsToSelect: string[] = [];
    const itemsToUnSelect: { [itemId: string]: boolean } = {};
    Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
      const item = apiRef.current!.getItem(itemId);
      if (isSelected) {
        itemsToSelect.push(...getItemDescendantsIds(item));
      } else {
        getItemDescendantsIds(item).forEach((descendantId) => {
          itemsToUnSelect[descendantId] = true;
        });
      }
    });

    const newSelectedItemsWithChildren = Array.from(
      new Set(
        [...newSelectedItems, ...itemsToSelect].filter(
          (itemId) => !itemsToUnSelect[itemId]
        )
      )
    );

    setSelectedItems(newSelectedItemsWithChildren);
    toggledItemRef.current = {};

    const lastItemId = Array.isArray(newSelectedItemsWithChildren)
      ? newSelectedItemsWithChildren[newSelectedItemsWithChildren.length - 1]
      : newSelectedItemsWithChildren;
    setLastClickedItem(newSelectedItemsWithChildren);

    // 상위 컴포넌트에 마지막 선택된 항목 전달
    onSelectedItemsChange(event, lastItemId);
  };

  const handleExpandClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked;
    setIsExpanded(newState);

    if (newState) {
      const allItemIds = menuData.map((item) => item.mid || "");
      setExpandedItems(allItemIds);
    } else {
      setExpandedItems([]);
    }
  };

  return (
    <Box
      sx={{
        width: "325px",
        borderRight: "1px solid #ddd",
        textAlign: "left",
      }}
    >
      <Stack sx={{ backgroundColor: "#fad0a1", maxHeight: "140px" }}>
        <Box
          sx={{
            textAlign: "center",
            overflowX: "auto", // 가로 스크롤 추가
            overflowY: "hidden",
            whiteSpace: "nowrap", // 텍스트가 한 줄로 표시되도록 설정
            display: "block", // 박스의 높이를 유지
            padding: 2,
            minHeight: "10vh",
          }}
        >
          <Typography>
            {lastClickedItem == null || lastClickedItem.length == 0
              ? "No item click recorded"
              : `Last clicked item: ${lastClickedItem}`}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography component="div">
            <Switch
              checked={isExpanded}
              onChange={handleExpandClick}
              inputProps={{ "aria-label": "controlled" }}
            />
            {isExpanded ? "Expand all" : "Collapse all"}
          </Typography>
        </Box>

        <Box
          sx={{
            minHeight: "70vh",
            minWidth: 250,
            backgroundColor: "#f5f5f5",
            padding: 2,
            overflowY: "auto",
          }}
        >
          <RichTreeView
            items={menuTreeItems}
            apiRef={apiRef}
            expandedItems={expandedItems}
            onExpandedItemsChange={(event, itemIds) => {
              setExpandedItems(itemIds);
            }}
            multiSelect // 다중 선택 활성화
            checkboxSelection // 체크박스 선택 활성화
            onItemClick={handleItemClick}
            isItemDisabled={isItemDisabled}
            selectedItems={selectedItems}
            onSelectedItemsChange={handleSelectedItemsChange}
            onItemSelectionToggle={(event, itemId, isSelected) => {
              toggledItemRef.current[itemId] = isSelected;
            }}
            slots={{
              expandIcon: AddBoxIcon,
              collapseIcon: IndeterminateCheckBoxIcon,
              item: CustomTreeItem,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default TreeViewLayout;
