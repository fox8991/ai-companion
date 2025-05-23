import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./sidebar";

export const MobileSidebar = ({ isPro } : {isPro: boolean}) => {
    return (
        <Sheet >
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <SideBar isPro={isPro}/>
            </SheetContent>
        </Sheet>
    )
}