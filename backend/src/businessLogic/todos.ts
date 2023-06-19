import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

//TODO: Implement businessLogic
const logger = createLogger('TodosAcess')
const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

/**
 * name: fnCreateTodo
 * @param: newTodo, userId
 * @return {todosAccess} A promise
 * description: create new a todo item
 */
export async function fnCreateTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('fnCreateTodo function called.')

  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  // const s3AttachmentUrl = attachmentUtils.fnGetAttachmentUrl(todoId)
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    // attachmentUrl: s3AttachmentUrl,
    ...newTodo
  }

  return await todosAccess.fnCreateTodoItem(newItem)
}

/**
 * name: fnGetTodosForUser
 * @param: userId
 * @return {todosAccess} A promise
 * description: Get all todo with each user id
 */
export async function fnGetTodosForUser(userId: string): Promise<TodoItem[]> {
  logger.info('Get todos for user function called.')

  return todosAccess.fnGetAllTodos(userId)
}

/**
 * name: fnUpdateTodo
 * @param: userId, todoId, todoUpdate
 * @return {todosAccess} A promise
 * description: Update data of todo task
 */
export async function fnUpdateTodo(
  userId: string,
  todoId: string,
  todoUpdate: UpdateTodoRequest
): Promise<TodoUpdate> {
  logger.info('Update todo function called')

  return await todosAccess.fnUpdateTodoItem(userId, todoId, todoUpdate)
}

/**
 * name: fnDeleteTodo
 * @param: userId, todoId
 * @return {todosAccess} A promise
 * description: Delete todo item
 */
export async function fnDeleteTodo(
  userId: string,
  todoId: string
): Promise<string> {
  logger.info('Delete todo function called')

  return todosAccess.fnDeleteTodoItem(userId, todoId)
}

/**
 * name: fnCreateAttachmentPresignedUrl
 * @param: todoId
 * @return {todosAccess} A promise
 * description: Upload image
 */
export async function fnCreateAttachmentPresignedUrl(
  todoId: string,
  userId: string
): Promise<string> {
  logger.info('Create attachment function called', todoId)

  todosAccess.fnUpdateTodoAttachmentUrl(userId, todoId)
  return attachmentUtils.fnGetUploadUrl(todoId)
}
