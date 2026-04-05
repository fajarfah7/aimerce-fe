import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";

export function SearchProduct() {
  return (
    <>
      <ButtonGroup>
        <Button variant={"outline"} aria-label="Search">
          <SearchIcon />
        </Button>
        <Input type="text" className="w-full" placeholder="Search" />
      </ButtonGroup>
    </>
  );
}
