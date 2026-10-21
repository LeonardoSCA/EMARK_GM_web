package com.example.emarkGM.service.impl;

import com.example.emarkGM.dto.request.CheckoutRequest;
import com.example.emarkGM.dto.response.OrderConfirmationResponse;
import com.example.emarkGM.model.Order;
import com.example.emarkGM.model.OrderItem;
import com.example.emarkGM.model.Product;
import com.example.emarkGM.model.User;
import com.example.emarkGM.repository.OrderRepository;
import com.example.emarkGM.repository.ProductRepository;
import com.example.emarkGM.repository.UserRepository;
import com.example.emarkGM.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OrderConfirmationResponse processCheckout(String userEmail, CheckoutRequest request) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        Order order = new Order();
        if (user != null) {
            order.setUserId(user.getId());
        }
        order.setClientName(request.getClientName());
        order.setClientDoc(request.getClientDoc());
        order.setDispatchType(request.getDispatchType());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setAddress(request.getAddress());
        order.setShippingCost(request.getShippingCost());
        order.setSubtotal(request.getSubtotal());
        order.setIgv(request.getIgv());
        order.setTotal(request.getTotal());
        order.setStatus("COMPLETED");
        order.setCreatedAt(LocalDateTime.now());

        Set<OrderItem> items = new HashSet<>();

        if (request.getItems() != null) {
            for (CheckoutRequest.CheckoutItemRequest itemReq : request.getItems()) {
                OrderItem item = new OrderItem(
                        itemReq.getProductId(),
                        itemReq.getQuantity(),
                        itemReq.getUnitPrice()
                );
                items.add(item);

                // Descontar inventario si existe
                if (itemReq.getProductId() != null) {
                    productRepository.findById(itemReq.getProductId()).ifPresent(product -> {
                        int nuevoStock = Math.max(0, product.getStock() - itemReq.getQuantity());
                        product.setStock(nuevoStock);
                        productRepository.save(product);
                    });
                }
            }
        }
        order.setItems(items);

        Order savedOrder = orderRepository.save(order);

        // Simulación de notificación y pasarela
        String notification = String.format(
                "[SIMULACIÓN WHATSAPP/EMAIL] ¡Hola %s! Tu pedido #%d por un total de S/ %.2f ha sido procesado exitosamente vía %s. Nuestro equipo de logística iniciará el despacho %s.",
                savedOrder.getClientName(),
                savedOrder.getId(),
                savedOrder.getTotal(),
                savedOrder.getPaymentMethod().toUpperCase(),
                savedOrder.getDispatchType()
        );

        return new OrderConfirmationResponse(
                savedOrder.getId(),
                savedOrder.getStatus(),
                savedOrder.getTotal(),
                "Compra y procesamiento simulados con éxito",
                notification,
                savedOrder.getCreatedAt()
        );
    }

    @Override
    public List<Order> getOrdersByUser(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .map(u -> orderRepository.findByUserId(u.getId()))
                .orElse(List.of());
    }

    @Override
    public List<Order> getAllOrders() {
        List<Order> list = new ArrayList<>();
        orderRepository.findAll().forEach(list::add);
        return list;
    }
}
