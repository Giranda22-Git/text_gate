const fs = require("fs/promises")
const path = require("path")

const logs_path = path.resolve(path.join(__dirname, '../logs.md'))

async function create (data) {
  await fs.writeFile(logs_path, `[N]${data}${process.env.LOGS_SPLITTER}`, { flag: 'a' })
}

async function read () {
  const logs = await extract_formated()
  for (const log of logs) {
    if (log.status === 'R') continue
    await update_status('R', log) 
    return log
  }

  return { message: 'Ящик с входящими пуст!' }
}

async function update_status (new_status, log) {
  let logs_utf8 = await fs.readFile(logs_path, { encoding: 'utf-8' })
  console.log(logs_utf8, log.position)
  const delta = (process.env.LOGS_SPLITTER.length + 1) * log.index
  logs_utf8 = `${logs_utf8.slice(0, log.position + delta + 1)}${new_status}${logs_utf8.slice(log.position + delta + 2)}`
  console.log(logs_utf8, delta)
  await fs.writeFile(logs_path, logs_utf8)
}

async function extract_formated () {
  const logs_utf8 = await fs.readFile(logs_path, { encoding: 'utf-8' })
  if (logs_utf8 === '') return []
  const logs_splited = logs_utf8.split(process.env.LOGS_SPLITTER)
  let position = 0

  return logs_splited.map((value, index) => {
    position += value.length - 1
    return {
      index,
      status: value[1],
      content: value.slice(3),
      position: position - (value.length - 1)
    }
  }).filter((value) => value.status != undefined)
}

module.exports = {
  create, read, update_status, extract_formated
}
