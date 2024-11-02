import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MenuItem as MenuItemType, MenuTitle } from "../data/MenuConstant";
import { getMenuItemByMid } from "../utils/MenuUtils";

interface TextFieldLayoutProps {
  selectedItem: string | null;
  onApplyChanges: (updatedItem: MenuItemType) => void;
}

const TextFieldLayout = ({
  selectedItem,
  onApplyChanges,
}: TextFieldLayoutProps) => {
  const selectedItemData = getMenuItemByMid(selectedItem);
  const [mnm, setMnm] = useState<string>(selectedItemData?.mnm || "");
  const [mpath, setMpath] = useState<string>(selectedItemData?.mpath || "");
  const [mlevel, setMlevel] = useState<string>(selectedItemData?.mlevel || "");
  const [morder, setMorder] = useState<string>(selectedItemData?.morder || "");
  const [misUse, setMisUse] = useState<string>(selectedItemData?.misUse || "Y");

  // selectedItem이 변경될 때 상태를 업데이트
  useEffect(() => {
    if (selectedItemData) {
      setMnm(selectedItemData.mnm || "");
      setMpath(selectedItemData.mpath || "");
      setMlevel(selectedItemData.mlevel || "");
      setMorder(selectedItemData.morder || "");
      setMisUse(selectedItemData.misUse || "Y");
    }
  }, [selectedItemData]);

  const handleIsUseChange = (event: SelectChangeEvent<string>) => {
    setMisUse(event.target.value);
  };

  // 적용 버튼 클릭 시 데이터 업데이트
  const handleApplyClick = () => {
    if (selectedItemData) {
      const updatedItem: MenuItemType = {
        ...selectedItemData, // null이 아닌 경우에만 적용
        mnm,
        mpath,
        mlevel,
        morder,
        misUse,
      };
      onApplyChanges(updatedItem);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        padding: "12px",
        marginTop: "12px",
        overflowY: "auto",
      }}
    >
      <Stack>
        <Box
          sx={{
            minWidth: "400px",
            padding: 2,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {selectedItem ? (
            <Box>
              <TextField
                label={MenuTitle.mid}
                value={selectedItemData?.mid || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label={MenuTitle.mnm}
                value={mnm}
                onChange={(e) => setMnm(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label={MenuTitle.mpath}
                value={mpath}
                onChange={(e) => setMpath(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label={MenuTitle.mlevel}
                value={mlevel}
                onChange={(e) => setMlevel(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label={MenuTitle.morder}
                value={morder}
                onChange={(e) => setMorder(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>{MenuTitle.misUse}</InputLabel>
                <Select
                  value={misUse}
                  onChange={handleIsUseChange}
                  fullWidth
                  label={MenuTitle.misUse}
                  sx={{
                    textAlign: "left",
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        textAlign: "left",
                      },
                    },
                  }}
                >
                  <MenuItem value="Y">Y</MenuItem>
                  <MenuItem value="N">N</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleApplyClick}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Typography>No item selected</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default TextFieldLayout;
