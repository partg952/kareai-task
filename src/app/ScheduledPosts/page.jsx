'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { Cancel, Edit } from "@mui/icons-material";
function ScheduledPosts() {

    const data = [{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"},{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"},{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"}]

  return (
    <div className="*:my-7">
      <h1 className="text-3xl">Manage Scheduled Posts</h1>
      <p>
        Current System Time :{" "}
        {new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Platform</TableColumn>
          <TableColumn>Product/Services</TableColumn>
          <TableColumn>Campaign</TableColumn>
          <TableColumn>Schedule Time</TableColumn>
          <TableColumn>Period</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
         {
            data.map((item,i) => (
                <TableRow key={i}>
                    <TableCell>{item.platform}</TableCell>
                    <TableCell>{item.products}</TableCell>
                    <TableCell>{item.campaign}</TableCell>
                    <TableCell>{item.scheduleTime}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>
                        <div className="flex items-center">
                            <Button variant='light' isIconOnly>
                                <Edit/>
                            </Button>
                            <Button variant='light' isIconOnly>
                                <Cancel/>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))
         } 
        </TableBody>
      </Table>
    </div>
  );
}

export default ScheduledPosts;
