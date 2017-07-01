import { Response } from '@angular/http';

import { fakeJsonResponse, fake5xxResponse } from '../responses';
import { ResourceDocument } from '../../src/hal/hal.model';

export const SHOP: ResourceDocument = {
  _links: {
    self: { href: '/orders' },
    next: { href: '/orders?page=2' },
    find: { href: '/orders{?id}', templated: true },
    admin: [
      { href: '/admins/2', title: 'Fred' },
      { href: '/admins/5', title: 'Kate' }
    ]
  },
  currentlyProcessing: 14,
  shippedToday: 20,
  _embedded: {
    orders: [
      {
        _links: {
          self: { href: '/orders/123' },
          basket: { href: '/baskets/98712' },
          customer: { href: '/customers/7809' }
        },
        total: 30.00,
        currency: 'USD',
        status: 'shipped'
      },
      {
        _links: {
          self: { href: '/orders/124' },
          basket: { href: '/baskets/97213' },
          customer: { href: '/customers/12369' }
        },
        total: 20.00,
        currency: 'USD',
        status: 'processing'
      }
    ]
  }
};

export const ORDER_123: ResourceDocument = (SHOP._embedded.orders as ResourceDocument[])[0];

export const ORDER_124: ResourceDocument = (SHOP._embedded.orders as ResourceDocument[])[1];

export const ADMIN_2: ResourceDocument = {
  _links: {
    self: { href: '/admin/2' }
  },
  name: 'Fred'
};

export const ADMIN_5: ResourceDocument = {
  _links: {
    self: { href: '/admin/5' }
  },
  name: 'Kate'
};

export const CUSTOMER_7809: ResourceDocument = {
  _links: {
    self: { href: '/customers/7809' }
  },
  name: 'Bob'
};

export const CUSTOMER_12369: ResourceDocument = {
  _links: {
    self: { href: '/customers/12369' }
  },
  name: 'Pepe'
};


export const fakeShopResponse = (url: string): Response => {

  switch (url) {
    case '/orders':
      return fakeJsonResponse(200, SHOP);

    case '/orders/123':
    case '/orders?id=123':
      return fakeJsonResponse(200, ORDER_123);

    case '/orders/124':
    case '/orders?id=124':
      return fakeJsonResponse(200, ORDER_124);

    case '/admin/2':
      return fakeJsonResponse(200, ADMIN_2);

    case '/admin/5':
      return fakeJsonResponse(200, ADMIN_5);

    case '/customers/7809':
      return fakeJsonResponse(200, CUSTOMER_7809);

    case '/customers/12369':
      return fakeJsonResponse(200, CUSTOMER_12369);

    default:
      return fake5xxResponse();
  }

};
