<script lang="ts">
	import { removeFromCart, increaseQuantity, decreaseQuantity } from '$lib/stores/cart';
	import type { CartItem } from '$lib/stores/cart';
	export let item: CartItem;

</script>

<div class="relative flex border-b border-gray-300 py-6">
	<div class="max-w-[35%]">
		<div class="absolute -right-3 top-4">
			<button class="btn btn-circle btn-ghost" on:click={() => removeFromCart(item)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="Layer_1"
					data-name="Layer 1"
					viewBox="0 0 24 24"
					height="24"
					width="24"
					fill="rgb(107, 114, 128)"
				>
					<path
						d="m15.707,11.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm7.293-6.707c0,.553-.448,1-1,1h-.885l-1.276,13.472c-.245,2.581-2.385,4.528-4.978,4.528h-5.727c-2.589,0-4.729-1.943-4.977-4.521l-1.296-13.479h-.86c-.552,0-1-.447-1-1s.448-1,1-1h4.101c.465-2.279,2.485-4,4.899-4h2c2.414,0,4.435,1.721,4.899,4h4.101c.552,0,1,.447,1,1Zm-14.828-1h7.656c-.413-1.164-1.524-2-2.828-2h-2c-1.304,0-2.415.836-2.828,2Zm10.934,2H4.87l1.278,13.287c.148,1.547,1.432,2.713,2.986,2.713h5.727c1.556,0,2.84-1.168,2.987-2.718l1.258-13.282Z"
					/>
				</svg>
			</button>
		</div>
		<a href={item.url}>
			<img src={item.imageUrl} alt={item.name} />
		</a>
	</div>
	<div class="flex w-full max-w-[65%] flex-col">
		<div class="flex flex-col px-4">
			<a href={item.url}>
				<h3 class="line-clamp-2 text-lg">{item.name}</h3>
			</a>
			<span class=" mt-2 line-clamp-1 block text-sm">{item.brand}</span>
		</div>
		<div class="mt-auto flex w-full justify-between pl-2">
			<div class="flex items-center">
				<div class="join">
                    <button class="btn join-item h-10 min-h-10 text-lg" on:click={() => decreaseQuantity(item, 1)}>-</button>
                    <span class="btn join-item h-10 min-h-10 cursor-default text-lg">{item.quantity}</span>
                    <button class="btn join-item h-10 min-h-10 text-lg" on:click={() => increaseQuantity(item, 1)}>+</button>
				</div>
			</div>
			<!-- TODO: Add discounted price -->
			<div class="flex items-center">
				<span class="p-0 text-lg text-gray-500">${item.price * item.quantity}</span>
			</div>
		</div>
	</div>
</div>
