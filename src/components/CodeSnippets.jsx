import { useState } from 'react';

const CodeSnippets = ({ isOpen, onClose, onInsertSnippet, currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const snippets = {
    general: [
      {
        name: 'Hello World',
        description: 'Basic hello world program',
        code: 'print("Hello, World!")',
        language: 'python3'
      },
      {
        name: 'For Loop',
        description: 'Basic for loop example',
        code: 'for i in range(10):\n    print(i)',
        language: 'python3'
      },
      {
        name: 'Function Definition',
        description: 'Define a simple function',
        code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))',
        language: 'python3'
      }
    ],
    algorithms: [
      {
        name: 'Bubble Sort',
        description: 'Simple sorting algorithm',
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`,
        language: 'python3'
      },
      {
        name: 'Binary Search',
        description: 'Efficient search algorithm',
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Example usage
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
result = binary_search(numbers, 7)
print(f"Found at index: {result}")`,
        language: 'python3'
      },
      {
        name: 'Fibonacci Sequence',
        description: 'Generate Fibonacci numbers',
        code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i), end=" ")`,
        language: 'python3'
      }
    ],
    data_structures: [
      {
        name: 'Stack Implementation',
        description: 'Simple stack data structure',
        code: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Example usage
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop())  # 3
print(stack.peek()) # 2`,
        language: 'python3'
      },
      {
        name: 'Queue Implementation',
        description: 'Simple queue data structure',
        code: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Example usage
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
print(queue.dequeue())  # 1
print(queue.dequeue())  # 2`,
        language: 'python3'
      }
    ],
    web: [
      {
        name: 'HTTP Request',
        description: 'Make HTTP requests',
        code: `import requests

# GET request
response = requests.get('https://api.github.com/users/octocat')
print(response.status_code)
print(response.json())

# POST request
data = {'name': 'John', 'age': 30}
response = requests.post('https://httpbin.org/post', json=data)
print(response.json())`,
        language: 'python3'
      },
      {
        name: 'JSON Handling',
        description: 'Work with JSON data',
        code: `import json

# Parse JSON
json_string = '{"name": "John", "age": 30, "city": "New York"}'
data = json.loads(json_string)
print(data["name"])

# Create JSON
person = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "swimming"]
}
json_output = json.dumps(person, indent=2)
print(json_output)`,
        language: 'python3'
      }
    ]
  };

  const categories = [
    { id: 'general', name: 'General', icon: '📝' },
    { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
    { id: 'data_structures', name: 'Data Structures', icon: '🏗️' },
    { id: 'web', name: 'Web Development', icon: '🌐' }
  ];

  const filteredSnippets = snippets[selectedCategory]?.filter(snippet =>
    snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleInsertSnippet = (snippet) => {
    onInsertSnippet(snippet.code);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="snippets-overlay">
      <div className="snippets-modal">
        <div className="snippets-header">
          <h2>Code Snippets</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="snippets-content">
          <div className="snippets-search">
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="snippets-search-input"
            />
          </div>

          <div className="snippets-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="snippets-list">
            {filteredSnippets.length === 0 ? (
              <div className="no-snippets">
                <div className="no-snippets-icon">🔍</div>
                <p>No snippets found</p>
                <p className="no-snippets-hint">Try a different search term</p>
              </div>
            ) : (
              filteredSnippets.map((snippet, index) => (
                <div key={index} className="snippet-item">
                  <div className="snippet-info">
                    <h3 className="snippet-name">{snippet.name}</h3>
                    <p className="snippet-description">{snippet.description}</p>
                    <div className="snippet-meta">
                      <span className="snippet-language">{snippet.language}</span>
                      <span className="snippet-lines">
                        {snippet.code.split('\n').length} lines
                      </span>
                    </div>
                  </div>
                  <div className="snippet-actions">
                    <button 
                      className="snippet-preview-button"
                      onClick={() => handleInsertSnippet(snippet)}
                      title="Insert snippet"
                    >
                      📋 Insert
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippets; 