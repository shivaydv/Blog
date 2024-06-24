import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Prisma from "../../prisma"
import { FormateDate } from "@/lib/FormateDate"
import { Button } from "./ui/button"
import { Copy, Edit } from "lucide-react"
import EditUser from "./EditUser"

const Users = async() => {

    const users = await Prisma.user.findMany({
        select: {
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })


  return (
    <Dialog>

    <Table>
      <TableCaption>All Registered Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead >Registration Date</TableHead>
          <TableHead className="text-center" >Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium text-nowrap">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="">{FormateDate(user.createdAt.toString())}</TableCell>
            <TableCell className="flex justify-center items-center "><EditUser key={user.email} email={user.email} role={user.role} /></TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
    
    </Dialog>
  )
}


export default Users