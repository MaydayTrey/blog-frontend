import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Checking the validitiy of the form', async () => {
  const mockCreateHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateHandler} />)


  //Okay, so I need to see how many textbox's we have.   
  const authorInput = screen.getByLabelText('Author')
  const titleInput = screen.getByLabelText('Title')
  const urlInput = screen.getByLabelText('URL')
  const submitButton = screen.getByText('Create blog')

  await user.type(authorInput, 'Some Author')
  await user.type(titleInput, 'Some Book')
  await user.type(urlInput, 'https://example.com')
  await user.click(submitButton)


  expect(mockCreateHandler.mock.calls[0][0].author).toBe('Some Author')
  expect(mockCreateHandler.mock.calls[0][0].title).toBe('Some Book')
  expect(mockCreateHandler.mock.calls[0][0].url).toBe('https://example.com')
  expect(mockCreateHandler.mock.calls).toHaveLength(1)
})

/*
5.16: Blog List Tests, step 4
Make a test for the new blog form. 
The test should check, 
that the form calls the event handler it received as props 
with the right details when a new blog is created.

What the hell does that even mean, that the form calls the event handler it received.. 
with the "right details" when a new blog is created? huh?

Fill in the form, submit it, verify the parent got handed the right object. 
*/
