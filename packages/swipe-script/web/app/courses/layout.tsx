import { CircleUserIcon } from '@/components/icons/circle-user-icon'
import { HamburgerMenuIcon } from '@/components/icons/hamburger-menu-icon'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="-mx-2 -mt-2 h-16 border-b border-border flex justify-between items-center px-4 py-4">
        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon className="text-3xl relative text-white-accent" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Add some settings here</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <CircleUserIcon className="text-2xl text-white-accent" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>User profile</SheetTitle>
              <SheetDescription>
                Not tracking your progress yet but I believe you&apos;re doing
                great!
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </header>
      <div className="w-full flex-grow">{children}</div>
    </>
  )
}
