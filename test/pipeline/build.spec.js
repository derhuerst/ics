import { expect } from 'chai'
import { buildEvent } from '../../src/pipeline'

describe('pipeline.build properties', () => {
  describe('title', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.title).to.equal('Untitled event')
    })
    it('sets a title', () => {
      const event = buildEvent({ title: 'Hello event!' })
      expect(event.title).to.equal('Hello event!')
    })
  })
  describe('productId', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.productId).to.equal('adamgibbons/ics')
    })
    it('sets a product id', () => {
      const event = buildEvent({ productId: 'myProductId' })
      expect(event.productId).to.equal('myProductId')
    })
  })
  describe('uid', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.uid).to.exist
    })
    it('sets a product id', () => {
      const event = buildEvent({ uid: 'myuid' })
      expect(event.uid).to.equal('myuid')
    })
  })  
  describe('start', () => {
    xit('defaults to UTC date-time format', () => {
      const event = buildEvent({ start: [2017, 0, 19, 1, 30] })
      expect(event.start).to.equal('20170119T083000Z')
      expect(event.title).to.equal('Untitled event')
    })
    xit('sets local time when specified', () => {
      const event = buildEvent({
        start: [2017, 0, 19, 1, 30],
        startType: 'local'
      })
      expect(event.start).to.equal('20170119T013000')
    })
  })
  describe('end', () => {
    xit('defaults to UTC date-time format', () => {
      const event = buildEvent({ end: [2017, 0, 19, 22, 0] })
      expect(event.end).to.equal('20170120T050000Z')
      expect(event.title).to.equal('Untitled event')
    })
    xit('sets local time when local start time specified', () => {
      const event = buildEvent({
        end: [2017, 0, 19, 1, 30],
        startType: 'local'
      })
      expect(event.end).to.equal('20170119T013000')
    })
  })
  describe('description', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.description).not.to.exist
    })
    it('sets a description', () => {
      const event = buildEvent({ description: 'feels so good' })
      expect(event.description).to.equal('feels so good')
    })
  })
  describe('url', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.url).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ url: 'http://www.google.com' })
      expect(event.url).to.equal('http://www.google.com')
    })
  })
  describe('geolocation', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.geolocation).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ geolocation: {lat: 1, lon: 2} })
      expect(event.geolocation).to.deep.equal({lat: 1, lon: 2})
    })
  })
  describe('location', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.location).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ location: 'little boxes' })
      expect(event.location).to.equal('little boxes')
    })
  })
  describe('categories', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.categories).not.to.exist
    })
    it('sets categories', () => {
      const event = buildEvent({ categories: ['foo', 'bar', 'baz'] })
      expect(event.categories).to.include('foo', 'bar', 'baz')
    })
  })
  describe('organizer', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.organizer).not.to.exist
    })
    it('sets an organizer', () => {
      const event = buildEvent({ organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }})
      expect(event.organizer).to.deep.equal({
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      })
    })
  })
  describe('attendees', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.attendees).not.to.exist
    })
    it('sets attendees', () => {
      const event = buildEvent({ attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com' },
        { name: 'Brittany Seaton', email: 'brittany@example.com' }
      ]})
      expect(event.attendees).to.be.an('array').to.have.length(2)
    })
  })
  describe('alarms', () => {
    it('removes falsey values', () => {
      const event = buildEvent()
      expect(event.alarms).not.to.exist
    })
    it('sets alarms', () => {
      const event = buildEvent({
        alarms: [{
          action: 'audio',
          trigger: [1997, 3, 17, 13, 30, 0],
          repeat: 4,
          duration: {
            hours: 1
          },
          description: 'Breakfast meeting with executive\nteam.'
        }]
      })
      console.log(event)
      expect(event.alarms).to.be.an('array')
    })
  })
})