package com.example.emarkGM.service;

import com.example.emarkGM.dto.request.CheckoutRequest;
import com.example.emarkGM.dto.response.OrderConfirmationResponse;
import com.example.emarkGM.model.Order;

import java.util.List;

public interface OrderService {
    OrderConfirmationResponse processCheckout(String userEmail, CheckoutRequest request);
    List<Order> getOrdersByUser(String userEmail);
    List<Order> getAllOrders();
}
