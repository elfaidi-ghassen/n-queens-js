

def permutations(letters):
    def generate_elements(str, todo):
        temp = []
        for c in todo:
            temp.append(str + c)
        return temp
    def permutations_for_element(str, todo, result_so_far):
        if todo == "":
            result_so_far.append(str)
            return result_so_far
        else:
            return permutations_for_element_list(generate_elements(str, todo), todo, result_so_far)
    def permutations_for_element_list(los, todo, result_so_far):
        if len(los) == 0:
            return result_so_far
        else:
            element = los.pop(0)
            permutations_for_element(element, todo.replace(element[-1], ""), result_so_far)
            return permutations_for_element_list(los, todo, result_so_far)
    return permutations_for_element("", letters, [])

ls = permutations("abcdef")
for k in ls:
    print(k)