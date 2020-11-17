import paginate from './challenge'

describe('Paginate', () => {
  let collection

  beforeEach(() => {
    collection = Array.apply(null, Array(100)).map((_, i) => ({
      id: i,
      userId: 1,
      title: 'ut quo aut ducimus alias',
      body: 'quam occaecati qui deleniti consectetur',
    }))
  })

  describe('Default pagination', () => {
    it('should return 10 items', () => {
      const paginate = paginate(collection)
      expect(paginate.data.length).to.equal(10)
    })

    it('should return current page as 1', () => {
      const paginate = paginate(collection)
      expect(paginate.currentPage).to.equal(1)
    })

    it('should throw error if not array', () => {
      expect(paginate.bind(null, 'string')).to.throw(/Expect array and got string/)
    })

    it('should return the correct default values', () => {
      const paginate = paginate(collection)
      expect(paginate.currentPage).to.equal(1)
      expect(paginate.perPage).to.equal(10)
      expect(paginate.total).to.equal(100)
      expect(paginate.totalPages).to.equal(10)
      expect(paginate.data).to.eql(collection.slice(0, 10))
    })
  })

  it('should return 15 items', () => {
    const paginate = paginate(collection, 1, 15)
    expect(paginate.currentPage).to.equal(1)
    expect(paginate.data.length).to.equal(15)
    expect(paginate.perPage).to.equal(15)
    expect(paginate.totalPages).to.equal(7)
  })
})
