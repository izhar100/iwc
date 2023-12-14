import { Box, Flex, Grid, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const addTask = async () => {
        try {
          const res = await fetch("http://localhost:8000/task", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
          })
          const data = await res.json()
          setTasks([data.task, ...tasks])
          setTask("")
        }
        catch (error) {
          console.log(error)
        }
      }
      addTask()
    }
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/task")
        const data = await res.json()
        console.log("tasks:", data)
        setTasks(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getTasks()
  }, [])

  const handleDelete = (item) => {
    const deleteTask = async () => {
      try {
        const res = await fetch(`http://localhost:8000/task/delete/${item._id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        const filteredTask = tasks.filter((el) => el._id !== item._id)
        setTasks(filteredTask)
      }
      catch (error) {
        console.log(error)
      }
    }
    deleteTask()
  }

  return (
    <>
      <Box bgColor={"#4f8a98"}>
        <Flex bgColor={"#000000"} color={"white"} p={"10px"} position={"fixed"} w={"100%"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={"10px"}>
            <HiOutlineMenuAlt2 size={"20px"} />
            <Heading>Notes</Heading>
          </Flex>
        </Flex>
        <br />
        <br />
        <br />
        <br />
        <Box className="task">
          <Flex justifyContent={"center"}>
            <Input placeholder="Take a note..." w={"50%"} h="60px" bgColor={"#ffffff"}
              onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyDown} />
          </Flex>
          <br />
          <Grid templateColumns="repeat(5, 1fr)" gap={4} p="20px">
            {tasks?.map((item, index) => (
              <Box
                key={index}
                bgColor={"#d9d9d9"}
                p={"10px"} borderRadius={"10px"}
              >
                {item.task.split(' ').length > 2 ? <Text fontWeight={500}>{item.task.split(' ')[0]} {item.task.split(' ')[1]}</Text> : <Text fontWeight={500}>{item.task.split(' ')[0]}</Text>}
                <Text>{item.task}</Text>
                <Flex justifyContent={"space-between"} mt={"10px"}>
                  <Text fontSize={"10px"} color={"#4c4c4c"}>{item.createdAt}</Text>
                  <Text cursor={"pointer"} onClick={() => handleDelete(item)}><MdDelete size={"25px"} color="#393939" /></Text>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>
        <br />
        <br />
      </Box>
    </>
  )
}

export default App
