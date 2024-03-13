import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

const NotebookNav: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="overflow-visible"
      >
        <Link href={"/notebook"}
              className={buttonVariants({
                variant: "ghost",
                size: "sm"
              })}>
          Docs
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <DropdownMenuItem asChild>
          <Link href={"/notebook/preprocessing"}>Preprocessing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/notebook/training"}>Training 1</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/notebook/training-2"}>Training 2</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/notebook/deployment"}>Deployment</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotebookNav
