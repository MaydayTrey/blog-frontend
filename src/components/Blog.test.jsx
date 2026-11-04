import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Some book',
    author: 'Some author',
    url: 'http://example.com',
    likes: 7,
    user: {
      name: 'Test User',
      username: 'testuser'
    }
  }

  render(<Blog blog={blog} />)

  screen.getByText('Some book', { exact: false })
  screen.getByText('Some author', { exact: false })

  const url = screen.queryByText('http://example.com', { exact: false })
  expect(url).toBeNull()

  const likes = screen.queryByText('Likes: 7', { exact: false })
  expect(likes).toBeNull()
})

test('Likes and URL are visible upon click', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn() //Do we need a mock handler? Not really, because we just want to actually click the button and see if it works right?

    const blog = {
        title: 'Some book',
        author: 'Some author',
        url: 'http://example.com',
        likes: 7,
        user: {
            name: 'Test User',
            username: 'testuser'
        }
    }
    render(<Blog blog={blog}/>)
    const button = screen.getByText('view')
    console.log(button)

    await user.click(button)

    const url = screen.queryByText('http://example.com', { exact: false })
    expect(url).toBeVisible()

    const likes = screen.queryByText('Likes: 7', { exact: false })
    expect(likes).toBeVisible()
    //Get the button -->  <button onClick={detailToggle}>{detailToggleState ? 'hide' : 'view'}</button>
    // Click it    
    //Check if likes and URL are available
})

/*
Evaluating the code:
So I see we create the blog object which is anticipated from blog; So you need to know what is expected for the prop shape.
Then what we do is render blog passing the blog we have created here, and via screen.getByText --> Some book, Some author,
but it's strange because we don't assing these to anything at all? 

then we use queryByText and expect url to be null? 
getByText throws if it doesn’t find the element. So calling it is itself an assertion: if the text isn’t there, the test fails with an error. You don’t need to store the result or wrap it in expect, because the finding is the test.
queryByText returns null if it doesn’t find anything. No throw. That’s the only way to assert something isn’t there, because getByText would blow up before you could check.

expect(url).toBeNull() then asserts that the search came up empty.



*/