import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function AppLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      if (quantity <= 0) {
        await base44.entities.CartItem.delete(id);
      } else {
        await base44.entities.CartItem.update(id, { quantity });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartItems.length} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Outlet context={{ cartItems, setCartOpen }} />
      </main>
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, qty) => updateMutation.mutate({ id, quantity: qty })}
        onRemove={(id) => updateMutation.mutate({ id, quantity: 0 })}
      />
    </div>
  );
}