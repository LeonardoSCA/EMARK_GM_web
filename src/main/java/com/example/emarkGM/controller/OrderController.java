package com.example.emarkGM.controller;

import com.example.emarkGM.dto.request.CheckoutRequest;
import com.example.emarkGM.dto.response.OrderConfirmationResponse;
import com.example.emarkGM.model.Order;
import com.example.emarkGM.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderConfirmationResponse> checkout(
            Authentication authentication,
            @RequestBody CheckoutRequest request
    ) {
        String email = (authentication != null) ? authentication.getName() : null;
        OrderConfirmationResponse response = orderService.processCheckout(email, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(orderService.getOrdersByUser(authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
