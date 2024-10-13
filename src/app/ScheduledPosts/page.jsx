'use client'
import React, { useContext } from "react";
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
import { Context } from "../contextProvider";
import { Cancel, Edit } from "@mui/icons-material";
function ScheduledPosts() {
    const value = useContext(Context);
    const data = [{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"},{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"},{platform : "Linkedin",products:"service1:magicai",campaign:"test",scheduleTime:"03:01:00",period:"weekly"}]
    data.push({
        platform:value.finalData.platform!=undefined && value.finalData.platform.join(","),
        products : value.finalData.company!=undefined && ("service1:"+value.finalData.company.toString()),
        campaign : value.finalData.objective,
        scheduleTime : value.finalData.time,
        period:value.finalData.duration
    });


  return (
    <div className="*:my-7 w-full flex items-center justify-center flex-col">
     
      <p>
        Current System Time :{" "}
        {new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
      <Table className="max-w-xl md:max-w-3xl" aria-label="Example static collection table">
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
