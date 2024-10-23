import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { MenuTitle } from "../data/MenuConstant";
import { getMenuItemByMid } from "../utils/MenuUtils";

interface TextFieldLayoutProps {
  selectedItem: string | null;
}

const TextFieldLayout = ({ selectedItem }: TextFieldLayoutProps) => {
  const selectedItemData = getMenuItemByMid(selectedItem);
  const [misUse, setMisUse] = useState<string>(selectedItemData?.misUse || "Y");

  const handleIsUseChange = (event: SelectChangeEvent<string>) => {
    setMisUse(event.target.value);
  };

  return (
    <Stack>
      <Box
        sx={{
          minHeight: "100%",
          minWidth: 250,
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
              value={selectedItemData?.mnm || ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label={MenuTitle.mpath}
              value={selectedItemData?.mpath || ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label={MenuTitle.mlevel}
              value={selectedItemData?.mlevel || ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label={MenuTitle.morder}
              value={selectedItemData?.morder || ""}
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
          </Box>
        ) : (
          <Typography>No item selected</Typography>
        )}
      </Box>
    </Stack>
  );
};

export default TextFieldLayout;
