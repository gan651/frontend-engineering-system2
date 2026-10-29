import { describe, expect, it } from 'vitest'
// describe 定义一个测试组

// it 定义一个测试用例

// expect 定义一个期望值



import { readBoolean } from './boolean.js'


describe('readBoolean', () => {
    it('should return true when value is "true"', () => {
        expect(readBoolean("true")).toBe(true)
    })
    it('should return false when value is "false"', () => {
        expect(readBoolean("false")).toBe(false)
    })
})
